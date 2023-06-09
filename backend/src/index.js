import 'dotenv/config.js'
import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { initializePassport } from './config/passport.js'
import cors from 'cors'
import routerIndex from './routes/index.routes.js';
import { Server } from "socket.io";
import compression from 'express-compression'
import errorHandler from './middleware/errors/errorHandler.js';
import { addLogger } from './utils/logger.js';
import {engine} from 'express-handlebars'
import * as path from 'path';
import { __dirname } from "./path.js";
//Swagger
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'



const whiteList = ['http://localhost:3000'] //Rutas validas a mi servidor
//CORS (Me da problemas por eso comentado)
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    // Agrega el encabezado Access-Control-Allow-Origin en todas las respuestas
    exposedHeaders: 'Access-Control-Allow-Origin'
}


//Iniciar Server
const app = express()


//HANDLEBARS YA QUE REACT NO ME QUIERE
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));



//MIDDLEWARES
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
//app.use(cors(corsOptions)) //Deshabilito cors para poder usar postman
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
app.use("/", express.static(__dirname + "/public"));

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Compression
app.use(compression({
    brotli: { enabled: true, zlib: {} }
}))


//Mongoose
const connectionMongoose = async () => {
    await mongoose.connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

connectionMongoose()

// app.use(cookieParser(process.env.JWT_SECRET))
//Logger
app.use(addLogger)
//Error Handler
// app.use(errorHandler)

app.use("/", routerIndex)




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

//Configuración SWAGGER
const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:
        {
            title: "Doc Backend Santiago Basso",
            description: "API para un ecommerce hecha en NodeJS para Coderhouse"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}




const specs = swaggerJSDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
