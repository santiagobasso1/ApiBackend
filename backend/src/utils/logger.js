import winston from "winston";

const customLevelOpt = {
    //De menor a mayor, no puse los que pide la entrega, sino los que hicimos en clase
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'blue'
    }
}
winston.remove(winston.transports.Console);

const logger = winston.createLogger({
    levels: customLevelOpt.levels, 
    transports: [
        new winston.transports.File({
            level: 'fatal',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'warning',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'debug',
            filename: './debug.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger 
    req.logger.info(`Metodo: ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} `)
    next()
}