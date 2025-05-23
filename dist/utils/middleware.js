"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.info("Method:", req.method);
    logger_1.default.info("Path:", req.path);
    logger_1.default.info("Body: ", req.body);
    logger_1.default.info("---");
    next();
};
const unknownEndpoint = (req, res) => {
    res.status(404).send({ message: "unknown endpoint" });
};
const errorHandler = (error, req, res, next) => {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        return res.status(400).send({ message: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    else if (error.name === 'MongoServerError' && error.message.includes("E11000 duplicate key error")) {
        return res.status(401).json({ message: "expected `email` to be unique" });
    }
    else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "token invalid" });
    }
    else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "token expired" });
    }
    next(error);
};
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
