import { createNewMessage,returnMessages } from "../services/messageService.js";
import { io } from "../index.js";

export const sendMessage = async (req, res) => {
    const { message } = req.body;
    try {
        console.log(req.user)
        await createNewMessage({
            nombre: req.session.user.first_name, 
            email: req.session.user.email,
            message: message
        });
        const messages = await returnMessages();
        console.log("Mensajes:", messages)

        io.emit("mensajes actualizados", messages);

        res.status(200).send({
            message: "Mensaje enviado",
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await returnMessages();
        console.log(messages)

        res.status(200).json({ 
            messages: messages
        });

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}