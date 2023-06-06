import { Router } from "express";
import { sendEmailView, sendRestorePasswordView, sendLoginView, sendMensaje, sendRegisterView} from "../controllers/handlebarsController.js";
const routerHandlebars = Router()

routerHandlebars.get("/emailForm", sendEmailView)
routerHandlebars.get("/restorePassword", sendRestorePasswordView)
routerHandlebars.get("/login",sendLoginView)
routerHandlebars.get("/",sendMensaje)
routerHandlebars.get("/register",sendRegisterView)

export default routerHandlebars