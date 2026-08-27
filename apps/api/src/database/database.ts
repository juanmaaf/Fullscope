import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

export const database = drizzle({
  connection: {
    connectionString: databaseUrl,
  },
});