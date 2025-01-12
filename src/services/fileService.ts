import { saveFileMetadata } from "../dao/fileDao";

const storeFileMetadata = async (file: any) => {
    const metadata = {
        originalname: file.originalname,
        filename: file.filename,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        path: file.path,
        size: file.size
    };

    return await saveFileMetadata(metadata);
};

export { storeFileMetadata };