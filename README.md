# Worker TypeScript Template

A high-performance TypeScript worker template with built-in support for cron scheduling, database operations, and robust error handling.

## Features

- 🚀 TypeScript support
- 📅 Cron job scheduling
- 🗄️ Database operations with Knex.js
- 🔒 Environment variable management
- 📝 Logging system
- 🔄 Transaction support
- 🛡️ Security middleware (Helmet, CORS)
- 🗜️ Compression middleware
- 🧪 Testing setup with Jest

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (if using database features)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd worker-ts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── config/          # Configuration files
│   ├── repositories/    # Database queries and data access
│   ├── routes/          # Express routes
│   ├── scripts/         # Standalone scripts
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── tests/               # Test files
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the TypeScript code
- `npm run lint`: Run ESLint
- `npm test`: Run tests

## Database Operations

This template uses Knex.js for database operations. Configure your database connection in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
```

Example database query:

```typescript
import { DatabaseService } from '../services/database.service';

const db = DatabaseService.getConnection();
const results = await db
    .select('*')
    .from('your_table')
    .where('column', '=', 'value');
```

## Transaction Support

The template includes transaction support for database operations:

```typescript
await db.transaction(async (trx) => {
    try {
        await trx('table').insert(data);
        await trx('another_table').update(otherData);
        // Transaction automatically commits if no errors
    } catch (error) {
        // Transaction automatically rolls back on error
        throw error;
    }
});
```

## Cron Jobs

Schedule tasks using node-cron:

```typescript
import cron from 'node-cron';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Your scheduled task
    } catch (error) {
        logger.error('Cron job failed:', error);
    }
});
```

## Error Handling

The template includes a centralized error handling system:

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
```

## Logging

Use the built-in logger for consistent log formatting:

```typescript
import { logger } from '../utils/logger';

logger.info('Operation successful');
logger.error('Error occurred:', error);
logger.debug('Debug information');
```

## Security

The template includes several security features:

- Helmet.js for secure headers
- CORS configuration
- Environment variable management
- SQL injection prevention through Knex.js

## Testing

Write tests using Jest:

```typescript
describe('Example Test', () => {
    it('should work', () => {
        expect(true).toBe(true);
    });
});
```

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
