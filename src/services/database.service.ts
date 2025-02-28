import knex, { Knex } from 'knex';
import { logger } from '../utils/logger';
import databaseConfig from '../config/database';

class DatabaseService {
    private static instance: DatabaseService;
    private connections: Map<string, Knex>;

    private constructor() {
        this.connections = new Map();
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async initializeConnections(): Promise<void> {
        try {
            for (const [dbName, config] of Object.entries(databaseConfig)) {
                const connection = knex(config);
                
                // Test the connection
                await connection.raw('SELECT 1');
                this.connections.set(dbName, connection);
                logger.info(`Successfully connected to database: ${dbName}`);
            }
        } catch (error) {
            logger.error('Error initializing database connections:', error);
            throw error;
        }
    }

    public getConnection(dbName: string): Knex {
        const connection = this.connections.get(dbName);
        if (!connection) {
            throw new Error(`No connection found for database: ${dbName}`);
        }
        return connection;
    }

    public async closeConnections(): Promise<void> {
        for (const [dbName, connection] of this.connections.entries()) {
            try {
                await connection.destroy();
                logger.info(`Closed connection to database: ${dbName}`);
            } catch (error) {
                logger.error(`Error closing connection to database ${dbName}:`, error);
            }
        }
        this.connections.clear();
    }
}

export default DatabaseService;
