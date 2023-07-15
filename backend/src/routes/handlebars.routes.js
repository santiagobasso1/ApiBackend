import { Router } from "express";
import { sendEmailView, sendRestorePasswordView, sendLoginView, sendMensaje, sendRegisterView, sendProductsView, sendCartView, sendProfileView} from "../controllers/handlebarsController.js";
const routerHandlebars = Router()

routerHandlebars.get("/emailForm", sendEmailView)
routerHandlebars.get("/restorePassword", sendRestorePasswordView)
routerHandlebars.get("/login",sendLoginView)
routerHandlebars.get("/",sendMensaje)
routerHandlebars.get("/register",sendRegisterView)
routerHandlebars.get("/products",sendProductsView)
routerHandlebars.get("/cart",sendCartView)
routerHandlebars.get("/profile",sendProfileView)

export default routerHandlebars