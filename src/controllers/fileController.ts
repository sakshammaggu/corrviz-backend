import fs from 'fs';
import axios from 'axios';
import path from "path";
import { Request, Response } from "express";

import { storeFileMetadata } from "../services/fileService";

const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = req.file;
        if (!file) { 
            res.status(400).json({ message: 'No file uploaded' }); 
            return;
        }

        const savedMetadata = await storeFileMetadata(file);
        const filePath = path.resolve(file.destination, file.filename);
        const csvData = fs.readFileSync(filePath, "utf-8");

        const pythonServiceUrl = "http://127.0.0.1:8080/api/process-csv"; 
        const pythonResponse = await axios.post(pythonServiceUrl, {
            filename: file.originalname,
            data: csvData,
        });

        res.status(200).json({ 
            message: 'File uploaded and processed successfully', 
            metadata: savedMetadata,
            pythonServiceMetadata: pythonResponse.data,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export { uploadFile };