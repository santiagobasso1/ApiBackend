import { ErrorEnum } from "../../utils/errors/errorEnum.js";
export default (error, req, res, next) => {
    
    console.log(error.code)
    switch (error.code) {
        case ErrorEnum.ROUTING_ERROR:
            req.logger.warning("Custom Error: Routing Error")
            res.send({ status: "Error", error: error.name, message: error.message, cause: error.cause })
            break;
        case ErrorEnum.DATABASE_ERROR:
            req.logger.warning("Custom Error: Database Error")
            res.send({ status: "Error", error: error.name, message: error.message, cause: error.cause })
            break;

        case ErrorEnum.INVALID_TYPES_ERROR:
            req.logger.warning("Custom Error: Invalid Types Error")
            res.send({ status: "Error", error: error.name, message: error.message, cause: error.cause })
            break;
        case ErrorEnum.MISSING_FIELDS:
            req.logger.warning("Custom Error: Missing Fields Error")
            res.send({ status: "Error", error: error.name, message: error.message, cause: error.cause })
            break;
        default:
            req.logger.warning("Custom Error: Unhandled Error")
            res.send({ status: "Error", error: "Unhandled error" })
            break;
    }
}

