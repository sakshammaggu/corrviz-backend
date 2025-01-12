import express from "express";
import config from "config";

import log from "./utils/loggerConfig/logger";
import connectMongoDb from "./utils/mongoDbConfig/mongoDbConnect";

import fileUploadRoute from "./routes/fileUpload/fileUploadRoute";
import userRoutes from "./routes/userRoutes";

const port=config.get<number>('port');
const app=express();
app.use(express.json());

app.use('/api', fileUploadRoute);
app.use('/api/users', userRoutes);

app.listen(port, async()=>{
    log.info(`App is running at port http://localhost:${port}`);
    await connectMongoDb();
});