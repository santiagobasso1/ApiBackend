import { Router } from 'express'
//import { sendTicketEmail } from '../utils/email.js'
import { roleVerification } from '../utils/errorMessages.js'
import { sendHbsUrl } from '../utils/hbs.js'
const routerUtils = Router()

//routerUtils.post('/ticketEmail',roleVerification(["Admin","Usuario"]), sendTicketEmail)
routerUtils.get('/hbsUrl',sendHbsUrl)

export default routerUtils


