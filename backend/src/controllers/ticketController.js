import { findCartById, updateCart, createCart } from "../services/cartService.js";
import { findProductById } from "../services/productService.js";
import { createTicket, returnLastCode } from "../services/ticketService.js";

export const generateTicketAndSave = async (req, res) => {
    const cart = await findCartById(req.session.user.idCart)
    if (cart.products.length > 0) {
        let amount = 0;
        let productosSinStock = [];
        for (const cartProduct of cart.products) {
            const dataBaseProduct = await findProductById(cartProduct.productId)
            if (dataBaseProduct) {
                if (dataBaseProduct.stock > cartProduct.quantity) {
                    amount += cartProduct.quantity;
                    dataBaseProduct.stock -= cartProduct.quantity;
                    await dataBaseProduct.save();
                } else {
                    productosSinStock.push(cartProduct.productId);
                }
            } else {
                const productosSinProcesar = cart.products;
                cart.products = [];
                await cart.save();
                
                return res.status(404).send({
                    message: "No existe el producto que está en el carrito, su carrito se vació", 
                    productosSinProcesar: productosSinProcesar
                })
                
            }
        }
        const lastCode = await returnLastCode();
        const nextCode = lastCode ? lastCode.code + 1 : 1;
        // const now = new Date();
        // const time = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        const ticket = await createTicket({
            code: nextCode,
            amount: amount,
            buyerEmail: req.session.user.email
            // purchase_dateTime: time 
        });
        cart.products = [];
        await cart.save();
        if (productosSinStock.length>0){
            return res.status(200).send({
                message: "Ticket generado, se vació el carrito, hay productos que no tienen stock", 
                ticket: ticket,
                productosSinStock: productosSinStock
            })
        }else{
            return res.status(200).send({
                message: "Ticket generado, se vació el carrito", 
                ticket: ticket
            })
        }
    } else {
        return res.status(404).send("El carrito está vacio")
    }

}
