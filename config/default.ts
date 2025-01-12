import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PUBLIC_SERVER_PORT,
    mongoDbUrl: process.env.PUBLIC_MONGODB_URL,
}