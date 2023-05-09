import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({ //Genero la forma de enviar info desde mail (o sea, desde Gmail con x cuenta)
    host: 'smtp.gmail.com', //Defino que voy a utilizar un servicio de Gmail
    port: 465,
    secure: true,
    auth: {
        user: "santiagobasso.sb@gmail.com", //Mail del que se envia informacion
        pass: "jvemgqpsjdkdappw",
        authMethod: 'LOGIN'
    }
})

export const sendEmail = async (req, res) => {
    await transporter.sendMail({
        from: 'Test Coder santiagobasso@hotmail.com',
        to: req.session.user.email,
        subject: "Sujeto del email",
        html: `
            <div>
                <h2>PRUEBA ESTO ES UN H2</h2>
            </div>
        `,
        attachments: []
    })
    res.send("Email enviado")
}
