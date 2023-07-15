
import { Router } from 'express'
import { getAndDeleteInactiveUsers, getUserForContact, getUsers } from "../controllers/userController.js";
import { associateDocumentsToUser, getUserDocumentsLink, upload } from '../middleware/multer.js';
import { roleVerification } from "../utils/errorMessages.js";




const routerUsers = Router()

//routerUsers.get('/',getUsers)
routerUsers.post('/documents',upload.any(),associateDocumentsToUser)
routerUsers.get('/documents',getUserDocumentsLink)
routerUsers.get('/',roleVerification(["Admin"]),getUserForContact)
routerUsers.delete('/',roleVerification(["Admin"]),getAndDeleteInactiveUsers) //ADMIN

export default routerUsers