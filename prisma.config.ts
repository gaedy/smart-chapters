import { defineConfig, env } from "prisma/config";
import 'dotenv/config'

// prisma/prisma.config.ts

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { 
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: { 
    url: env("DATABASE_URL") 
  }
});