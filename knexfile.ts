import path from 'path';
import dotEnv from 'dotenv';
dotEnv.config();

module.exports = {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};
