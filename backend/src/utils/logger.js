import winston from 'winston'

const logFileName = './errors.log'

const customLevelOpt = {
    //De menor a mayor, no puse los que pide la entrega, sino los que hicimos en clase
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    }, //Los colors no los aplico ya que no se ven bien en el archivo
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'blue'
    }
}
//El devLogger solo escribe por consola
const devLogger = winston.createLogger({
    levels: customLevelOpt.levels,
    format: winston.format.simple(),
    transports: [new winston.transports.Console({ level: 'debug' })]
})
//El prodLogger guarda los problemas y errores en el archivo
const prodLogger = winston.createLogger({
    levels: customLevelOpt.levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({
            filename: logFileName,
            level: 'warning'  //Se mostrarán los que sean mas que warning incluyendolo, al tener 1 solo transport file no escribe varias veces
        })
    ]
})
//Elegimos cual de los 2 logger utilizar dependiendo de la variable de entorno
const getLogger = () => {
    if (process.env.LOGGER_TYPE === "prod") {
        return prodLogger
    }else if(process.env.LOGGER_TYPE === "dev"){
        return devLogger
    }
}
//Exportamos el middleware
export const addLogger = (req, res, next) => {
    req.logger = getLogger()
    req.logger.info(`Metodo: ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} `)
    next()
}
