import 'dotenv/config.js'
import { createUser, findUserByEmail, updateUser } from "../services/UserService.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";
import { CustomError } from "../utils/errors/customErrors.js";
import { ErrorEnum } from "../utils/errors/errorEnum.js";
import crypto from 'crypto'
import { transporter } from "../utils/email.js";

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('login', (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Ha ocurrido un error durante el login",
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send({
                    message: "Usuario o contraseña no válidos",
                    user: user
                })
            }
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log(token);
            res.cookie('userCookie', token, { maxAge: 3600000 }).send({
                status: "success",
                message: "Logged in"
            });
        })(req, res, next);
    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}



//JWT Por el profe, no implementado JWT
// export const loginUser = async (req, res, next) => {
//     try {
//         passport.authenticate('jwt', { session: false }, async (err, user, info) => {
//             if (err) {
//                 return res.status(401).send("Error en consulta de token")
//             }

//             if (!user) {
//                 //El token no existe, entonces consulto por el usuario
//                 const { email, password } = req.body
//                 const userBDD = await findUserByEmail(email)

//                 if (!userBDD) {
//                     // UserBDD no encontrado en mi aplicacion
//                     return res.status(401).send("User no encontrado")
//                 }

//                 if (!validatePassword(password, userBDD.password)) {
//                     // Contraseña no es válida
//                     return res.status(401).send("Contraseña no valida")
//                 }

//                 // Ya que el usuario es valido, genero un nuevo token
//                 const token = jwt.sign({ user: { id: userBDD._id } }, process.env.JWT_SECRET)
//                 res.cookie('jwt', token, { httpOnly: true })
//                 return res.status(200).json({ token })
//             } else {
//                 //El token existe, asi que lo valido
//                 console.log("Pase?")
//                 const token = req.cookies.jwt;
//                 jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//                     if (err) {
//                         // Token no valido
//                         return res.status(401).send("Credenciales no válidas")
//                     } else {
//                         // Token valido
//                         req.user = user
//                         return res.status(200).send("Creedenciales validas")

//                     }
//                 })
//             }

//         })(req, res, next)
//     } catch (error) {
//         res.status(500).send(`Ocurrio un error en Session, ${error}`)
//     }
// }
export const registerUser = async (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Ha ocurrido un error durante el registro",
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send({
                    message: "El correo electrónico ya está en uso",
                    user: user
                })
            }
            return res.status(200).send({
                message: "Registrado correctamente",
                user: user
            })
        })(req, res, next)

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }

}

export const destroySession = async (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy()
            res.status(200).send("La sesión ha terminado, hasta la próxima")
        } else {
            return res.status(401).send("No existe sesion activa")
        }
    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const getSession = async (req, res) => {
    //Con JWT
    const cookie = req.cookies['userCookie']
    if (!cookie){
        req.logger.fatal("Logued user not found")
        return res.status(401).json({ error: "Logued user not found" })
    }
    const user = jwt.verify(cookie,process.env.JWT_SECRET);
    console.log(user)
    try{
        if(user){
            return res.status(200).json({ 
                message: "success" ,
                ...user
            });
        }else{
            return res.status(404).json({ 
                message: "error, session not found" 
            });
        }
    }catch(error){
        return res.status(500).json({
            message: "error with the server",
            error: error
        })
    }
    
    //Esto es sin JWT
    // if(user)
    //     return res.send({status:"success",payload:user})
    // try {
    //     if (req.session.login) {
    //         req.logger.info("GetSessionUser: " + req.session.user)
    //         res.status(200).json({ response: req.session.user });
    //     } else {
    //         return res.status(401).send("No existe sesion activa")
    //     }
    // } catch (error) {
    //     req.logger.fatal("Fatal error/Server connection")
    //     res.status(500).send({
    //         message: "Hubo un error en el servidor",
    //         error: error.message
    //     })
    // }
}

export const getSessionObject = async (req, res) => {
    try {
        if (req.session.login) {
            req.logger.info("GetSessionUser: " + req.session.user)
            const user = req.session.user
            return user
        } else {
            return res.status(401).send("No existe sesion activa")
        }
    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        return error
    }
}


export const sendResetPasswordLink = async (req, res) => {
    const { email } = req.body

    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(404).send({message:'Email not found in database'})

        }
        if (user) {
            const resetLink = await generatePasswordResetLink(user, req, res)

            const mailToSend = {
                from: 'no-reply',
                to: email,
                subject: 'Password reset link',
                text: `Dirigete al siguiente link para poner una nueva contraseña
            ${resetLink}`
            }
            transporter.sendMail(mailToSend)

            req.logger.debug(user)

            req.logger.info(`Password reset link sent to ${email}`)
            res.status(200).json(`Password reset link sent to ${email}`)
        }


    } catch (error) {
        req.logger.error(`Error in password reset - ${error.message}`)
        res.status(500).send({
            message: 'Server internal error',
            error: error.message
        })
    }
}



export const resetPassword = async (req, res, next) => {
    const email = req.signedCookies.tokenEmail
    if (!email){
        return res.status(404).send({message:'Email not found or password reset link expired, redirecting'})
    }
    const { password, confirmPassword } = req.body
    console.log(email)
    try {
        const browserCookie = req.signedCookies.resetToken
        console.log(browserCookie)
        const user = await findUserByEmail(email)


        //Está este control pero no es necesario ya que reviso antes que el usuario exista, por un caso muy raro como si lo borraran en ese tiempo entre que pidió el link y hizo el recovery
        if (!user) {
            return res.status(404).send({message:'Email not found, redirecting'})
        }

        if (!browserCookie || isTokenExpired(browserCookie, user.resetToken)) {
            return res.status(401).send({message:'Password reset link expired'})
        }

        if (user.resetToken.token !== browserCookie) {
            return res.status(401).send({message:'Unauthorized action'})
        }

        if (password !== confirmPassword) {
            return res.status(400).send({message:'Both password fields must match'})
        }

        if (await validatePassword(password, user.password)) {
            return res.status(400).send({message:'New password must be different from the current one'})
        }

        // * Requirements passed, now we change the password
        const newPassword = await createHash(password.toString())
        await updateUser(user._id, {
            password: newPassword,
            resetToken: { token: '' }
        })
        res.status(200).send({message:'Password updated. Redirecting to login.'})

    } catch (error) {
        res.status(500).send({
            message: 'Error on password reset',
            error: error.message
        })
    }
}



async function generatePasswordResetLink(user, req, res) {
    const token = crypto.randomBytes(20).toString('hex')

    await updateUser(user._id, {
        resetToken: {
            token: token,
            createdAt: Date.now()
        }
    })

    res.cookie('resetToken', token, {
        signed: true,
        maxAge: 1000 * 60 * 60 
    })
    //Generamos un email que dure lo mismo que el token para no tener que pedirselo al usuario
    res.cookie('tokenEmail', user.email, {
        signed: true,
        maxAge: 1000 * 60 * 60
    })
    const link = `http://localhost:4000/handlebars/restorePassword`
    return link
}

function isTokenExpired(receivedCookie, storedToken) {
    const elapsedTime = Date.now() - storedToken.createdAt
    const expirationTime = 1000 * 60 * 60
    return elapsedTime >= expirationTime
}
