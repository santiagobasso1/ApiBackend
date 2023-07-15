import { Router } from 'express'
//import { sendTicketEmail } from '../utils/email.js'
import { roleVerification } from '../utils/errorMessages.js'
const routerUtils = Router()

//routerUtils.post('/ticketEmail',roleVerification(["Admin","Usuario"]), sendTicketEmail)

export default routerUtils


