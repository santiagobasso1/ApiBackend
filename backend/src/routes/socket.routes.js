import { Router } from "express";
import { roleVerification } from "../utils/errorMessages.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";
const routerSocket = Router();


routerSocket.post('/chat', roleVerification(["Usuario"]), sendMessage);
routerSocket.get('/chat', roleVerification(["Usuario","Admin"]), getMessages);

export default routerSocket;