import { Router } from "express";
import routerSession from "./session.routes.js";
import routerUsers from "./users.routes.js";
import routerGithub from "./github.routes.js";
import routerPoliticas from "./politicas.routes.js";
import routerProduct from "./products.routes.js";
import routerCarts from "./cart.routes.js";
import routerUtils from "./utils.routes.js";
import routerSocket from "./socket.routes.js";

const routerIndex = Router()

routerIndex.use("/auth", routerSession)
routerIndex.use("/auth", routerGithub) //Para que pueda loguearse con session o con github
routerIndex.use("/user", routerUsers)
routerIndex.use("/politicas",routerPoliticas)
routerIndex.use("/api/product",routerProduct)
routerIndex.use("/api/cart",routerCarts)
routerIndex.use("/utils", routerUtils)
routerIndex.use("/socket", routerSocket)
export default routerIndex