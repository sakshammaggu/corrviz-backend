import {Request, Response, NextFunction} from 'express';

const fileMetadataLoggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) : void => {
    const file = req.file;

    if (!file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    console.log('File Metadata:', {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
    });

    next();
}

export default fileMetadataLoggerMiddleware;