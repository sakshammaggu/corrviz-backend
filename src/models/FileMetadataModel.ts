import mongoose from "mongoose";

interface FileMetadataInterface extends mongoose.Document {
    originalname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}

const FileMetadataSchema = new mongoose.Schema<FileMetadataInterface>({
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true }
});

const FileMetadataModel = mongoose.model<FileMetadataInterface>("FileMetadata", FileMetadataSchema);
export default FileMetadataModel;