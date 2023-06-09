import { findCartById, updateCart, createCart } from "../services/cartService.js";
import { findProductById } from "../services/productService.js";
import productModel from "../models/MongoDB/productModel.js";
import { CustomError } from '../utils/errors/customErrors.js';
import { ErrorEnum } from "../utils/errors/errorEnum.js";
import { generateAddProductToCartErrorInfo } from "../utils/errors/errorInfo.js";

export const getCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;

        try {
            const cart = await findCartById(idCart);

            if (!cart) {
                throw new Error(`El carrito no existe`);
            }

            const cartPopulate = await cart.populate({ path: "products.productId", model: productModel })
            res.status(200).json({ 
                message: "Carrito devuelto correctamente",
                cart: cartPopulate 
            });

        } catch (error) {
            req.logger.fatal("Fatal error/Server connection")
            res.status(500).send({
                message: "Hubo un error en el servidor", 
                error: error.message
            })
        }

    } else {
        req.logger.error("Session not found")
        return res.status(401).send("No existe sesion activa")
    }
}

export const updateCartProducts = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;
        const info = req.body;

        try {
            const cart = await updateCart(idCart, { products: info });
            req.logger.info("Cart updated")
            return res.status(200).json({
                message:"Carrito actualizado",
                cart: cart
            })

        } catch (error) {
            req.logger.fatal("Fatal error/Server connection")
            res.status(500).send({
                message: "Hubo un error en el servidor", 
                error: error.message
            })
        }

    } else {
        req.logger.error("Session not found")
        return res.status(401).send("No existe sesion activa")
    }
}

export const addProductToCart = async (req, res, next) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;
        const productoExiste = await findProductById(idProduct)
        try {
            if (!productoExiste) 
            {
                throw CustomError.createError({ //Sin el throw funciona también
                    name: "Add Product Error",
                    message: "Missing Product",
                    cause: generateAddProductToCartErrorInfo(idProduct),
                    code: ErrorEnum.MISSING_FIELDS
                });
            }else{
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
                        req.logger.info("New Product in the cart, id:"+idProduct)
                        return res.status(200).json({
                            message:"Producto agregado al carrito",
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
       

    } else {
        return res.status(401).send("No existe sesion activa")
    }
}

export const updateProductQuantity = async (req, res) => {
    if (req.session.login) {
        const { quantity } = req.body;

        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;
        const newQuantity = parseInt(quantity);

        try {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

            if (productIndex === -1) {
                throw new Error('El producto no existe en el carrito.');
            }

            cart.products[productIndex].quantity = newQuantity;
            await cart.save();
            return res.status(200).json({
                message:"Cantidad del producto actualizada",
                cart: await cart.populate({ path: "products.productId", model: productModel })
            })

        } catch (error) {
            req.logger.fatal("Fatal error/Server connection")
            res.status(500).send({
                message: "Hubo un error en el servidor", 
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa")
    }
}

export const deleteAllProductsFromCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;

        try {
            await updateCart(idCart, { products: [] });
            return res.status(200).json({message:"Productos borrados"})

        } catch (error) {
            req.logger.fatal("Fatal error/Server connection")
            res.status(500).send({
                message: "Hubo un error en el servidor", 
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa")
    }
}

export const deleteOneProductFromCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;

        try {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

            if (productIndex === -1) {
                throw new Error('El producto no existe en el carrito.');
            }

            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({
                message:"El producto ha sido eliminado del carrito",
                cart: await cart.populate({ path: "products.productId", model: productModel })
            })


        } catch (error) {
            req.logger.fatal("Fatal error/Server connection")
            res.status(500).send({
                message: "Hubo un error en el servidor", 
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa")
    }
}