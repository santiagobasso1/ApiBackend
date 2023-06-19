import { findCartById, updateCart, createCart } from "../services/cartService.js";
import { findProductById } from "../services/productService.js";
import productModel from "../models/MongoDB/productModel.js";
import { CustomError } from '../utils/errors/customErrors.js';
import { ErrorEnum } from "../utils/errors/errorEnum.js";
import { generateAddProductToCartErrorInfo } from "../utils/errors/errorInfo.js";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken"

export const getCart = async (req, res) => {
    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;
    try {
        const cart = await findCartById(idCart);
        if (!cart) {
            throw new Error(`El carrito no existe`);
        }
        const cartPopulate = await cart.populate({ path: "products.productId", model: productModel })
        return res.status(200).json({
            message: "Carrito devuelto correctamente",
            cart: cartPopulate
        });
    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        return res.status(500).json({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const updateCartProducts = async (req, res) => {
    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;
    const info = req.body
    try {
        console.log(info)
        for (const product of info) {
            if (!isValidObjectId(product.productId)) {
                return res.status(404).json({
                    message: "The ID Needs to be in mongodb ObjectId format",
                    productId: product.productId
                })
            }
            const product2 = await productModel.findById(product.productId)
            console.log(product2)
            if (!product2) {
                return res.status(404).json({
                    message: "Product not found",
                    productId: product.productId
                })
            }
        }

        // productModel.findById(product)
        await updateCart(idCart, { products: info });
        const cart = await findCartById(idCart)
        req.logger.info("Cart updated");
        return res.status(200).json({
            message: "Carrito actualizado",
            cart: await cart.populate({ path: "products.productId", model: productModel })
        });

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection");
        res.status(500).json({
            message: "Hubo un error en el servidor",
            error: error.message
        });
    }
    //SIN JWT
    // const idCart = req.session.user.idCart;
    // const info = req.body;
    // try {
    //     await updateCart(idCart, { products: info });
    //     const cart = await findCartById(idCart)
    //     req.logger.info("Cart updated");
    //     return res.status(200).json({
    //         message: "Carrito actualizado",
    //         cart: await cart.populate({ path: "products.productId", model: productModel })
    //     });

    // } catch (error) {
    //     req.logger.fatal("Fatal error/Server connection");
    //     res.status(500).json({
    //         message: "Hubo un error en el servidor",
    //         error: error.message
    //     });
    // }


}


export const addProductToCart = async (req, res, next) => {

    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;
    const idProduct = req.params.pid;
    if (!isValidObjectId(idProduct)) {
        return res.status(400).json({ message: "The ID Needs to be in mongodb ObjectId format" })
    }
    const productoExiste = await findProductById(idProduct)
    try {
        if (!productoExiste) {
            throw CustomError.createError({ //Sin el throw funciona también
                name: "Add Product Error",
                message: "Missing Product",
                cause: generateAddProductToCartErrorInfo(idProduct),
                code: ErrorEnum.MISSING_FIELDS
            });
        } else {
            try {
                const realProduct = await findProductById(idProduct);
                if (realProduct) {
                    const cart = await findCartById(idCart);
                    const productIndex = cart.products.findIndex(product => product.productId == idProduct);
                    if (productIndex === -1) {
                        cart.products.push({ productId: idProduct });
                    } else {
                        cart.products[productIndex].quantity += 1;
                    }

                    await cart.save();
                    req.logger.info("New Product in the cart, id:" + idProduct)
                    return res.status(200).json({
                        message: "Producto agregado al carrito",
                        cart: await cart.populate({ path: "products.productId", model: productModel })

                    })
                }

            } catch (error) {
                req.logger.fatal("Fatal error/Server connection")
                res.status(500).send({
                    message: "Hubo un error en el servidor",
                    error: error.message
                })
            }
        }
    } catch (error) {
        next(error);
    }
}

export const updateProductQuantity = async (req, res) => {

    const { quantity } = req.body;
    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;
    //const idCart = req.session.user.idCart; //Si se desea volver a sessions sin jwt, se debe cambiar las lineas de arriba por esta

    const idProduct = req.params.pid;
    if (!isValidObjectId(idProduct)) {
        return res.status(400).json({ message: "Needs to be in mongodb ObjectId format" })
    }
    const newQuantity = parseInt(quantity);

    try {
        const cart = await findCartById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

        if (productIndex === -1) {
            throw new Error('El producto no existe en el carrito.');
        }
        const dbProduct = await productModel.findById(idProduct)
        if (dbProduct.stock < newQuantity) {
            return res.status(400).json({ message: "Not enough stock" })
        }
        cart.products[productIndex].quantity = newQuantity;
        await cart.save();
        return res.status(200).json({
            message: "Cantidad del producto actualizada",
            cart: await cart.populate({ path: "products.productId", model: productModel })
        })

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const deleteAllProductsFromCart = async (req, res) => {

    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;

    try {
        await updateCart(idCart, { products: [] });
        return res.status(200).json({ message: "Productos borrados" })

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const deleteOneProductFromCart = async (req, res) => {
    const cookie = req.cookies['userCookie']
    if (!cookie) {
        return res.status(404).json({ message: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const idCart = loguedUser.idCart;
    const idProduct = req.params.pid;
    if (!isValidObjectId(idProduct)) {
        return res.status(400).json({ message: "Needs to be in mongodb ObjectId format" })
    }
    try {
        const cart = await findCartById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

        if (productIndex === -1) {
            throw new Error('El producto no existe en el carrito.');
        }

        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({
            message: "El producto ha sido eliminado del carrito",
            cart: await cart.populate({ path: "products.productId", model: productModel })
        })


    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Fatal error/Server connection",
            error: error.message
        })
    }


}