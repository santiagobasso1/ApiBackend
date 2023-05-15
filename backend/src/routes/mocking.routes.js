import { Router } from "express";
import { fakeProductMock } from "../utils/mocking/productsMock.js";
const routerMocking = Router()

routerMocking.get("/mockingproducts", fakeProductMock)


export default routerMocking