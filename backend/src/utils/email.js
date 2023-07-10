import nodemailer from 'nodemailer'
import 'dotenv/config.js'
export const transporter = nodemailer.createTransport({ //Genero la forma de enviar info desde mail (o sea, desde Gmail con x cuenta)
    host: 'smtp.gmail.com', //Defino que voy a utilizar un servicio de Gmail
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_SENDER, //Mail del que se envia informacion
        pass: process.env.MAIL_PASSWORD,
        authMethod: 'LOGIN'
    }
})


export const sendEmail = async (req, res) => {
    try {
        await transporter.sendMail({
            from: 'Test Coder santiagobasso@hotmail.com',
            to: req.session.user.email,
            subject: "Sujeto del email",
            html: `
                <div>
                    <h2>Su Ticket: (No implementado aun)</h2>
                </div>
            `,
            attachments: []
        })
        res.status(200).send({ message: "Email enviado" })
    } catch (error) {
        res.status(400).send({
            message: "Problema con el email que envia",
            error: error
        })
    }

}



export const sendDeleteNotification = async (user) => {
    console.log(user.email)
    await transporter.sendMail({
        from: 'Santiago Basso',
        to: user.email,
        subject: "Account notification email",
        html: `
                <div>
                    <h2>Su cuenta fue eliminada por inactividad</h2>
                </div>
            `,
        attachments: []
    })
    return "Email sent"


}
