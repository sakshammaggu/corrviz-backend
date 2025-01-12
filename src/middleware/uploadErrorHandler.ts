import { Request, Response, NextFunction } from 'express';

const uploadErrorHandler = (
    err: any, 
    req: Request, 
    res: Response, 
    next:NextFunction
) : void => {
    if (err) {
        // console.log('File upload error:', err.message);
        res.status(500).json({ message: 'Error processing file upload', error: err.message });
    }
}

export default uploadErrorHandler;