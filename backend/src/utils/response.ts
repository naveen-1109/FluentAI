import { Response } from 'express';

export function sendSuccess(res: Response, message: string, data?: any, statusCode: number = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
}

export function sendError(res: Response, message: string, code: string = 'INTERNAL_ERROR', statusCode: number = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
  });
}
