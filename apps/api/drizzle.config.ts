import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

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

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${encodeURIComponent(DATABASE_USER)}:${encodeURIComponent(DATABASE_PASSWORD)}@${DATABASE_HOST}:5432/${DATABASE_NAME}`,
  },
});