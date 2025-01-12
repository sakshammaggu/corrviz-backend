import express from 'express';
import multer from 'multer';

import uploadErrorHandler from '../../middleware/uploadErrorHandler';
import fileMetadataLoggerMiddleware from '../../middleware/fileMetadataLoggerMiddleware';
import fileValidationMiddleware from '../../middleware/fileValidationMiddleware';

import { uploadFile } from '../../controllers/fileController';

const router=express.Router();
const upload=multer({dest:'uploads/'});

router.post(
    '/upload',
    upload.single('file'),

    fileValidationMiddleware,
    fileMetadataLoggerMiddleware,
    uploadErrorHandler,

    uploadFile
);

export default router;