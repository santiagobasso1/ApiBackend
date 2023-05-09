import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { roleVerification } from "../utils/errorMessages.js";

const routerProduct = Router();

routerProduct.get('/', getProducts);
routerProduct.get('/:pid',roleVerification(["Admin"]), getProduct);
routerProduct.post('/',roleVerification(["Admin"]), addProducts);
routerProduct.put('/:pid',roleVerification(["Admin"]), updateProduct);
routerProduct.delete('/:pid',roleVerification(["Admin"]), deleteProduct); //Solo al admin se le permite realizar esto.

export default routerProduct