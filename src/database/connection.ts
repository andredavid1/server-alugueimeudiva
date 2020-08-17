import knex from 'knex';
import path from 'path';
import dotEnv from 'dotenv';
dotEnv.config();

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
});

export default db;
