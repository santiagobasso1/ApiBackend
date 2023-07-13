import { createNewMessage,returnMessages } from "../services/messageService.js";
import { io } from "../index.js";

export const sendMessage = async (req, res) => {
    const { first_name, email, message } = req.body;
    try {
        await createNewMessage({
            nombre: first_name, 
            email: email,
            message: message
        });
        const messages = await returnMessages();

        io.emit("allMessages", messages);

        res.status(200).send({
            message: "Mensaje enviado",
        });

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        //console.log(error.message)
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await returnMessages();

        res.status(200).json({ 
            messages: messages
        });

    } catch (error) {
        req.logger.fatal("Fatal error/Server connection")
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}