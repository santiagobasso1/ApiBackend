import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteAllProductsFromCart, deleteOneProductFromCart } from "../controllers/cartController.js";
import { generateTicketAndSave } from "../controllers/ticketController.js";
import { roleVerification } from "../utils/errorMessages.js";
const routerCarts = Router();


routerCarts.get('/',roleVerification(["User"]), getCart); //El admin puede verlo pero no modificarlo
routerCarts.put('/',roleVerification(["User"]), updateCartProducts); //Solo el User puede manejar su cart
routerCarts.post('/product/:pid',roleVerification(["User"]), addProductToCart); 
routerCarts.put('/product/:pid',roleVerification(["User"]), updateProductQuantity);
routerCarts.delete('/',roleVerification(["User"]), deleteAllProductsFromCart);
routerCarts.delete('/product/:pid',roleVerification(["User"]), deleteOneProductFromCart);
routerCarts.post('/purchase',roleVerification(["User"]), generateTicketAndSave)
export default routerCarts