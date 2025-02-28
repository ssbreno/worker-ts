import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { setupCronJobs } from './cron';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes';
import DatabaseService from './services/database.service';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

app.use(errorHandler);

const dbService = DatabaseService.getInstance();

async function startServer() {
    try {
        await dbService.initializeConnections();
        logger.info('Database connections initialized successfully');

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
            setupCronJobs();
        });

        process.on('SIGTERM', async () => {
            logger.info('SIGTERM received. Starting graceful shutdown...');
            await dbService.closeConnections();
            process.exit(0);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
