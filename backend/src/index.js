import 'dotenv/config.js'
import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import {initializePassport} from './config/passport.js'
import cors from 'cors'
import routerIndex from './routes/index.routes.js';
import { Server } from "socket.io";
 
const whiteList = ['http://localhost:3000'] //Rutas validas a mi servidor
//CORS (Me da problemas por eso comentado)
// const corsOptions = { //Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
//     origin: (origin, callback) => {
//         if (whiteList.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by Cors'))
//         }
//     }
// }

//Iniciar Server
const app = express()

//MIDDLEWARES
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
// app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 500
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//Mongoose
const connectionMongoose = async () => {
    await mongoose.connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

connectionMongoose()

app.use(cookieParser(process.env.JWT_SECRET))


app.use("/",routerIndex)


const server = app.listen(4000, () => {
    console.log(`Server on port 4000`)
})

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: 'GET, POST, PUT, DELETE',
        optionsSuccessStatus: 200,
        preflightContinue: false,
        maxAge: 3600,
    },
}); 