import { Router } from "express";
import routerSession from "./session.routes.js";
import routerUsers from "./user.routes.js";
import routerGithub from "./github.routes.js";
import routerPoliticas from "./politicas.routes.js";
import routerProduct from "./products.routes.js";
import routerCarts from "./cart.routes.js";
import routerUtils from "./utils.routes.js";
import routerSocket from "./socket.routes.js";
import routerMocking from "./mocking.routes.js";
import routerLogger from "./logger.routes.js";
import routerHandlebars from "./handlebars.routes.js";

const routerIndex = Router()

routerIndex.use("/api/session", routerSession)
routerIndex.use("/auth", routerGithub) //Para que pueda loguearse con session o con github
routerIndex.use("/api/users", routerUsers)
routerIndex.use("/politicas", routerPoliticas)
routerIndex.use("/api/products", routerProduct)
routerIndex.use("/api/carts", routerCarts)
routerIndex.use("/utils", routerUtils)
routerIndex.use("/socket", routerSocket)
routerIndex.use("/mocking", routerMocking)
routerIndex.use("/loggerTest", routerLogger)
routerIndex.use("/handlebars",routerHandlebars)



export default routerIndex