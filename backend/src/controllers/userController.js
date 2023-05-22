import {findUsers, createUser } from "../services/UserService.js"

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        req.logger.fatal("Fatal error: "+error)
        res.status(500).send(error)
    }

}

