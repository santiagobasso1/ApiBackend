import { findUsers, delUserById, createUser, findUsersForContact, findUserById } from "../services/UserService.js"
import { sendDeleteNotification } from "../utils/email.js"

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        return res.status(200).send(users)

    } catch (error) {
        req.logger.fatal("Fatal error: " + error)
        return res.status(500).send(error)
    }

}


export const getUserForContact = async (req, res) => {
    try {
        const users = await findUsersForContact()
        return res.status(200).send(users)
    } catch (error) {
        req.logger.fatal("Fatal error: " + error)
        return res.status(500).send(error)
    }

}


export const getAndDeleteInactiveUsers = async (req,res) => {
    try {
        const users = await findUsers();
        if (users.length===0){
            return res.status(404).json({message:"Users not found"})
        }
        for (const user of users) {
            const lastConnection = user.lastConnection;
            const currentDate = new Date();
            const millisecondsPerDay = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un día
            const daysSinceLastConnection = Math.floor((currentDate - lastConnection) / millisecondsPerDay);
            if (daysSinceLastConnection >= 0) {
                await delUserById(user._id)
            }
            console.log(await sendDeleteNotification(user))
            console.log(daysSinceLastConnection)
        }


        return res.status(200).json({message:"Inactive users deleted"});
    } catch (error) {
        return res.status(500).json({message:error})
        }
};
