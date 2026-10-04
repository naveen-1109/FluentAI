import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error("Central Error Handler:", err);
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'An internal error occurred' : err.message || 'Internal server error';
  const code = err.code || 'INTERNAL_ERROR';

  return sendError(res, message, code, statusCode);
}
