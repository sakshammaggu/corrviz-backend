import {Request, Response, NextFunction} from 'express';

const fileValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) : void => {
    const file = req.file;

    if (!file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    const allowedFileType = ['text/csv'];
    if (!allowedFileType.includes(file.mimetype)) {
        res.status(400).json({ message: 'Invalid file type. Only CSV allowed.' });
        return;
    }

    const maxSize = 5*1024*1024;
    if (file.size > maxSize) {
        res.status(400).json({ message: 'File size exceeds the 5MB limit.' });
        return;
    }

    next();
};

export default fileValidationMiddleware;