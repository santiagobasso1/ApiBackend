import { Router } from "express";
import { fakeProductMock } from "../utils/mocking/productsMock.js";

const routerMocking = Router()

routerMocking.get("/mockingproducts", fakeProductMock) //No pido verificación de rol ya que es por esta entrega, luego le pediré roleVerification para admin



export default routerMocking