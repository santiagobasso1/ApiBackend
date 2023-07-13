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


export const sendTicketEmail = async (ticket) => {
    try {
 /*        let purchaseProductsMessage = ""
        ticket.products.forEach((product) => {
            purchaseProductsMessage += `Product: ${product.product}, price: ${product.price}, quantity: ${product.quantity}\n`;
        }); */
        const productListHTML = ticket.products .map((product) =>
                `<li>Product: ${product.product}, price: ${product.price}, quantity: ${product.quantity}</li>` ).join("");

        await transporter.sendMail({
            from: 'Test Coder santiagobasso@hotmail.com',
            to: ticket.buyerEmail,
            subject: "El ticket de su compra",
            html: `
                <div>
                    <h2>El ticket de su compra</h2>
                    <p>Id: ${ticket._id}</p>
                    <p>Code: ${ticket.code}</p>
                    <p>Amount: ${ticket.amount}</p>
                    <h3>Products</h3>
                    <p>${productListHTML}</p>
                    <h3>Total: $${ticket.total}</h3>

                </div>
            `,
            attachments: []
        })
        return {message:"Email sent"}
    } catch (error) {
        return {
            message: "Problema con el email que envia",
            error: error
        }
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
