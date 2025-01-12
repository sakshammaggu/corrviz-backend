import FileMetadataModel from "../models/FileMetadataModel";

const saveFileMetadata = async (metadata: any) => {
    return await FileMetadataModel.create(metadata);
};

export { saveFileMetadata };