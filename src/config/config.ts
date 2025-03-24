import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.MONGO

const SERVER_PORT = process.env.PORT || 3000;

export const config = {
    mongo: {
        url: DATABASE_URL
    },
    server: {
        port: SERVER_PORT
    }
};