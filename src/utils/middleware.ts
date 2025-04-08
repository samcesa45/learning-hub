import logger from "./logger"
import {Request,Response,NextFunction} from 'express';

const requestLogger = (req:Request, res:Response, next:NextFunction) => {
    logger.info("Method:", req.method);
    logger.info("Path:", req.path);
    logger.info("Body: ", req.body);
    logger.info("---");
    next();
}

const unknownEndpoint = (req:Request, res:Response) => {
    res.status(404).send({message:"unknown endpoint"})
}

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return res.status(400).send({message:'malformatted id'})
    }else if(error.name === 'ValidationError') {
        return res.status(400).json({message: error.message});
    } else if(error.name === 'MongoServerError' && error.message.includes("E11000 duplicate key error")){
        return res.status(401).json({message:"expected `email` to be unique"})
    } else if(error.name === "JsonWebTokenError") {
        return res.status(401).json({message:"token invalid"})
    } else if(error.name === "TokenExpiredError") {
        return res.status(401).json({message:"token expired"})
    }

    next(error);
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
}