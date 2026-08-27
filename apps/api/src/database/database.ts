import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_NAME,
} = process.env;

if (
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_HOST ||
  !DATABASE_NAME
) {
  throw new Error(
    'Database environment variables are not fully configured',
  );
}

const databaseUrl = `postgresql://${encodeURIComponent(DATABASE_USER)}:${encodeURIComponent(DATABASE_PASSWORD)}@${DATABASE_HOST}:5432/${DATABASE_NAME}`;

export const database = drizzle({
  connection: {
    connectionString: databaseUrl,
  },
});