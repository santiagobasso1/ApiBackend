import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteAllProductsFromCart, deleteOneProductFromCart } from "../controllers/cartController.js";
import { generateTicketAndSave } from "../controllers/ticketController.js";
import { roleVerification } from "../utils/errorMessages.js";
const routerCarts = Router();


routerCarts.get('/',roleVerification(["Admin","Usuario"]), getCart); //El admin puede verlo pero no modificarlo
routerCarts.put('/',roleVerification(["Usuario"]), updateCartProducts); //Solo el usuario puede manejar su cart
routerCarts.post('/product/:pid',roleVerification(["Usuario"]), addProductToCart); 
routerCarts.put('/product/:pid',roleVerification(["Usuario"]), updateProductQuantity);
routerCarts.delete('/',roleVerification(["Usuario"]), deleteAllProductsFromCart);
routerCarts.delete('/product/:pid',roleVerification(["Usuario"]), deleteOneProductFromCart);
routerCarts.post('/purchase',roleVerification(["Usuario"]),generateTicketAndSave)
export default routerCarts