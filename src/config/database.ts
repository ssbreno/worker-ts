import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
    [key: string]: Knex.Config;
}

const databaseConfig: DatabaseConfig = {
    cadastroWorkflow: {
        client: 'postgresql',
        connection: {
            host: process.env.CADWF_DB_HOST,
            port: Number(process.env.CADWF_DB_PORT),
            database: process.env.CADWF_DB_NAME,
            user: process.env.CADWF_DB_USER,
            password: process.env.CADWF_DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: '../migrations/cadastro',
        },
    },
    brm: {
        client: 'postgresql',
        connection: {
            host: process.env.BRM_DB_HOST,
            port: Number(process.env.BRM_DB_PORT),
            database: process.env.BRM_DB_NAME,
            user: process.env.BRM_DB_USER,
            password: process.env.BRM_DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: '../migrations/brm',
        },
    },
};

export default databaseConfig;
