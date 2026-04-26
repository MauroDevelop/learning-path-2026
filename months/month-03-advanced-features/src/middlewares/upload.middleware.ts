import multer from 'multer';
import { Request } from 'express';
// import AppError to throw standardized errors
import { AppError } from '../shared/errors/AppError';

// Configured where to store our file (in RAM memory)
const storage = multer.memoryStorage()

// Created a filter to verify the file type (we only want image)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        return cb(null, true); // 'null' significate that there is't an error and 'true' that file is valid
    }
    // Return an error if file type is incorrect
    return cb(new AppError('Invalid file type. Only images are allowed.', 400));
}

// Package the middleward configuration for export
export const uploadMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // limit set to 5MB (5 * 1024 KB * 1024 Bytes)
    }
})