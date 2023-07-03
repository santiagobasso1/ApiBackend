
import { Router } from 'express'
import { getUsers } from "../controllers/userController.js";
import { associateDocumentsToUser, getUserDocumentsLink, upload } from '../middleware/multer.js';




const routerUsers = Router()

routerUsers.get('/', getUsers)
routerUsers.post('/documents',upload.any(),associateDocumentsToUser)
routerUsers.get('/documents',getUserDocumentsLink)

export default routerUsers