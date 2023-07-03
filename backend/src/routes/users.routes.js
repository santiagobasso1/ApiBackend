
import { Router } from 'express'
import { getUsers } from "../controllers/userController.js";
import { mensajeResultadoMulter, upload } from '../middleware/multer.js';




const routerUsers = Router()

routerUsers.get('/', getUsers)
routerUsers.post('/documents',upload.any(),mensajeResultadoMulter)

export default routerUsers