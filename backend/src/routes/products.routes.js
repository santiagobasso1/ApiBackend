import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { roleVerification } from "../utils/errorMessages.js";

const routerProduct = Router();


routerProduct.get('/', getProducts); 
routerProduct.get('/:pid', getProduct);
routerProduct.post('/',roleVerification(["Admin"]), addProducts);
routerProduct.put('/:pid',roleVerification(["Admin"]), updateProduct);
routerProduct.delete('/:pid',roleVerification(["Admin"]), deleteProduct); 
// ,roleVerification(["Admin"])
export default routerProduct