import { ErrorRequestHandler } from 'express';
import express from 'express'

export function setupMiddlewares(app: express.Application): void {
    
    app.use(express.json()); 
    app.use(errorHandler);
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};
