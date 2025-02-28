import cron from 'node-cron';
import { logger } from '../utils/logger';

// Example task function
async function exampleTask(): Promise<void> {
    try {
        logger.info('Running example task');
        // Add your task logic here
    } catch (error) {
        logger.error('Error in example task:', error);
    }
}

export function setupCronJobs(): void {
    // Run every minute
    cron.schedule('* * * * *', () => {
        void exampleTask();
    }, {
        scheduled: true,
        timezone: "UTC"
    });

    // Example of a more complex schedule (every day at 00:00)
    cron.schedule('0 0 * * *', () => {
        logger.info('Running daily task');
        // Add your daily task here
    }, {
        scheduled: true,
        timezone: "UTC"
    });

    logger.info('Cron jobs initialized');
}
