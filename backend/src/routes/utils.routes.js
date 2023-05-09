import { Router } from 'express'
import { sendEmail } from '../utils/email.js'
import { roleVerification } from '../utils/errorMessages.js'
const routerUtils = Router()

routerUtils.post('/email',roleVerification(["Admin","Usuario"]), sendEmail)

export default routerUtils


