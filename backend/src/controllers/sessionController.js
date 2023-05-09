import { createUser, findUserByEmail } from "../services/UserService.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";
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
                    message:"Usuario o contraseña no validos",
                    user: user
                })
            }
            req.session.login = true;
            req.session.user = user;
            console.log(req.session)
            return res.status(200).send({
                meesage: "Login exitoso",
                user: user
            })
        })(req, res, next)

    } catch (error) {
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
                    error: err.message })
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
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }
}

export const getSession = async (req, res) => {
    try {
        if (req.session.login) {
            console.log(req.session.user)
            res.status(200).json({ response: req.session.user });
        } else {
            return res.status(401).send("No existe sesion activa")
        }
    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }
}