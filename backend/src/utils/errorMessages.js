import passport from "passport"
import jwt from "jsonwebtoken"

export const passportError = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) { //Errores del Token (token no valido, no posee el formato adecuado o no existe, etc)
                return next(error)
            }

            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}



export const roleVerification = (roles) => {
    //CON JWT
    return async (req,res,next)=>{
        try{
            const cookie = req.cookies['userCookie']
            if (!cookie){
                req.logger.fatal("Logued user not found")
                return res.status(401).json({ error: "Logued user not found" })
            }
            const loguedUser = jwt.verify(cookie,process.env.JWT_SECRET).user;
            let allowed = false
            roles.forEach(rol => {
                if (rol.toUpperCase() === loguedUser.rol.toUpperCase()){
                    req.logger.info("User Allowed")
                    allowed = true
                }
            });
            
            if (!allowed){
                return res.status(403).json({message:"User not allowed"})
            }
            
            next()
        }catch(error){
            res.status(500).json({message:"Error with the server"})
        }

    }
    //SIN JWT
    // let bandera = 1
    // return async (req, res, next) => {
    //     const userAccess = req.session.user
    //     console.log(userAccess)
    //     if (!req.session.user) {
    //         return res.status(401).json({ error: "User no autorizado" })
    //     }

    //     roles.forEach(rolEnviado => {
    //         if (userAccess.rol == rolEnviado) { //El user no tiene el rol necesario a esta ruta y a este rol
    //             bandera = 0
    //         } else if(bandera!=0) {
    //             bandera = 1
    //         }
    //     });

    //     if (bandera == 1) {
    //         return res.status(401).json({ error: "User no posee los permisos necesarios" })
    //     }


    //     next()

    // }

} 