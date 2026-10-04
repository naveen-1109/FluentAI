import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'audio/webm',
  'audio/webm;codecs=opus',
  'audio/wav',
  'audio/x-wav',
  'audio/mp3',
  'audio/mpeg',
  'audio/ogg',
  'audio/m4a',
  'audio/aac'
];

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB explicit limit
  },
  fileFilter: (_req, file, cb) => {
    const normalizedType = file.mimetype.split(';')[0].toLowerCase();
    const isAllowed = allowedMimeTypes.some((type) => type.toLowerCase().startsWith(normalizedType));
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported audio MIME type: "${file.mimetype}". Allowed types: ${allowedMimeTypes.join(', ')}`));
    }
  },
});

export function uploadSingleAudio(req: Request, res: Response, next: NextFunction) {
  // Support field name 'audio' or 'file'
  const uploadHandler = upload.single('audio');
  uploadHandler(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          success: false,
          error: 'Audio file is too large. Maximum allowed size is 50 MB.',
          code: 'LIMIT_FILE_SIZE'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'Error parsing multipart audio file upload',
        code: 'UPLOAD_FILE_ERROR'
      });
    }
    next();
  });
}
