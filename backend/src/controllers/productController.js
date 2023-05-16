import { findProductById, insertProducts, updateOneProduct, paginateProducts, deleteOneProduct } from "../services/productService.js";
import { CustomError } from '../utils/errors/customErrors.js';
import { ErrorEnum } from "../utils/errors/errorEnum.js";
import { generateAddProductErrorInfo } from "../utils/errors/errorInfo.js";
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
        res.status(500).send({ error: error.message })
    }



}

export const getProduct = async (req, res) => {
    const idProduct = req.params.pid;

    try {
        const product = await findProductById(idProduct);
        return res.status(200).json(product)

    } catch (error) {
        res.status(500).send({
            message: "Error al buscar el producto",
            error: error.message
        });
    }
}

export const addProducts = async (req, res, next) => {
    console.log(req.body)
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
                    thumbnails: info.thumbnails
                }),
                code: ErrorEnum.MISSING_FIELDS
            })
        }else{
            try {
                const products = await insertProducts(info);
                res.status(200).send({
                    message: 'Productos agregados correctamente',
                    products: products
                });
    
            } catch (error) {
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
    const idProduct = req.params.pid;
    const info = req.body;

    try {
        const product = await updateOneProduct(idProduct, info);

        if (product) {
            return res.status(200).json({
                message: "Producto actualizado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    const idProduct = req.params.pid;

    try {
        const product = await deleteOneProduct(idProduct);

        if (product) {
            return res.status(200).json({
                message: "Producto eliminado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}