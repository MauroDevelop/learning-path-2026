// prisma.config.ts
import { defineConfig } from '@prisma/config';

// Export the configuration so the Prisma CLI can read it
export default defineConfig({
  // Location of models (tables)" o "Where models (tables) are located
  schema: {
    kind: 'single',   // Number of schema files" o "Schema file count
    filePath: 'prisma/schema.prisma',   // Schema path
  },
  // Configure the database connection
  datasource: {
    provider: 'mysql',
    url: process.env.DATABASE_URL, // Lee la URL de tu archivo .env
  },
});