import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { roleVerification } from "../utils/errorMessages.js";

const routerProduct = Router();

routerProduct.get('/',getProducts); //Este se saca en caso de querer ver los products por el front
routerProduct.get('/:pid', getProduct);
routerProduct.post('/',roleVerification(["Admin","Premium"]), addProducts);// Por esta entrega solo el "Premium" puede generar productos
routerProduct.put('/:pid',roleVerification(["Admin","Premium"]), updateProduct);
routerProduct.delete('/:pid',roleVerification(["Admin","Premium"]), deleteProduct); //Solo al admin se le permite realizar esto.

export default routerProduct