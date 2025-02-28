import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message
    });
};
