import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json(
        {
            message: err.message,
            stack: process.env.NODE_ENV == 'development' ? err.stack : null
        }
    )
}

export default errorHandler

