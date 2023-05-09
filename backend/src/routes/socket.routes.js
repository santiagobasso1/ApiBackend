import { Router } from "express";
import { roleVerification } from "../utils/errorMessages.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";
const routerSocket = Router();


routerSocket.post('/chat', sendMessage); //No tiene role verification porque sino no funciona el front
routerSocket.get('/chat', getMessages);

export default routerSocket;