import { ErrorEnum } from "../../utils/errors/errorEnum.js";
export default (error, req, res, next) => {
    console.log(error.code)
    switch (error.code) {
        case ErrorEnum.ROUTING_ERROR:
            res.send({ status: "Error", error: error.name })
            break;
        case ErrorEnum.DATABASE_ERROR:
            res.send({ status: "Error", error: error.name })
            break;

        case ErrorEnum.INVALID_TYPES_ERROR:
            res.send({ status: "Error", error: error.name })
            break;
        default:
            res.send({ status: "Error", error: "Unhandled error" })
            break;
    }
}

