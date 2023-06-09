import { findProductById, insertProducts, updateOneProduct, paginateProducts, deleteOneProduct } from "../services/productService.js";
import { CustomError } from '../utils/errors/customErrors.js';
import { ErrorEnum } from "../utils/errors/errorEnum.js";
import { generateAddProductErrorInfo } from "../utils/errors/errorInfo.js";
import { getSessionObject } from "./sessionController.js";

export const getProducts = async (req, res, next) => {
    const { limit = 10, page = 1, sort = "", category = "" } = req.query;

    const filters = { stock: { $gt: 0 } };
    if (category) filters.category = category;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };
    if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 }

    try {
        const products = await paginateProducts(filters, options);

        const prevLink = products.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.prevPage}` : null
        const nextLink = products.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.nextPage}` : null

        return res.status(200).json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        })
    } catch (error) {
        req.logger.fatal("Fatal error: "+error.message)
        res.status(500).send({ error: error.message })
    }



}

export const getProduct = async (req, res) => {
    const idProduct = req.params.pid;

    try {
        const product = await findProductById(idProduct);
        return res.status(200).json(product)

    } catch (error) {
        req.logger.fatal("Fatal error looking for the product")
        res.status(500).send({
            message: "Error al buscar el producto",
            error: error.message
        });
    }
}

export const addProducts = async (req, res, next) => {
    //EL control de si el usuario es premium o no se realiza antes, en el middleware de roleVerification
    // const user = await getSessionObject(req,res);
    const info = req.body;
    try {
        if (!info.title || !info.description || !info.code || !info.price || !info.stock || !info.category || !info.thumbnails) 
        {
            CustomError.createError({
                name: "Add products error",
                message: "missing fields",
                cause: generateAddProductErrorInfo({
                    title: info.title,
                    description: info.description,
                    code: info.code,
                    price: info.price,
                    stock: info.stock,
                    category: info.category,
                    thumbnails: info.thumbnails,
                }),
                code: ErrorEnum.MISSING_FIELDS
            })
            req.logger.fatal("Missing fields, product:"+info)
        }else{
            try {
                //Comentado porque solo fue para la practica integradora 3 donde asociabamos al usuario con el producto
                // if (user){
                //     info.owner = user._id
                // }
                console.log(info)
                const products = await insertProducts(info);
                res.status(200).send({
                    message: 'Productos agregados correctamente',
                    products: products
                });
    
            } catch (error) {
                req.logger.fatal("Fatal error: "+error.message)
                res.status(500).send({
                    error: error.message
                });
            }
        }

        
    }
    catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res) => {

    // const user = await getSessionObject(req,res);
    //Solo los roles ADMIN y PREMIUM llegan hasta acá, ya que el restante de roles no pasan el middleware
    //Está comentado ya que el usuario PREMIUM solo fue para la practica integradora 3
    // if (user.rol=="Premium"){
    //     const product = await findProductById(req.params.pid);
    //     if (product){
    //         if (product.owner != user._id){
    //             return res.status(200).json({
    //                 message:"You can't modify products if you're not the owner"
    //             })
    //         }
    //     }else{
    //         return res.status(200).json({
    //             message: "Product not found"
    //         })
    //     }
       
    // }
    
    const idProduct = req.params.pid;
    const info = req.body;

    try {
        const product = await updateOneProduct(idProduct, info);

        if (product) {
            return res.status(200).json({
                message: "Producto actualizado",
                product: product
            });
        }

        res.status(404).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        req.logger.fatal("Fatal error: "+error.message)
        res.status(500).send({
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    // const user = await getSessionObject(req,res);
    //Solo los roles ADMIN y PREMIUM llegan hasta acá, ya que el restante de roles no pasan el middleware
    //Está comentado ya que el usuario PREMIUM solo fue para la practica integradora 3
    // if (user.rol=="Premium"){
    //     const product = await findProductById(req.params.pid);
    //     if (product){
    //         if (product.owner != user._id){
    //             return res.status(200).json({
    //                 message:"You can't delete products if you're not the owner"
    //             })
    //         }
    //     }else{
    //         return res.status(200).json({
    //             message: "Product not found"
    //         })
    //     }
       
    // }
    const idProduct = req.params.pid;

    try {
        const product = await deleteOneProduct(idProduct);
        console.log(product)
        if (product) {
            return res.status(200).json({
                message: "Producto eliminado",
                product: product
            });
        }

        res.status(404).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        req.logger.fatal("Fatal error: "+error.message)
        res.status(500).json({
            error: error.message
        });
    }
}