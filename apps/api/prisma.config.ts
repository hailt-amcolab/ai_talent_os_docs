import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { migrationUrl } from './src/infra/database/config.ts'

const connection = process.env.DIRECT_URL || process.env.DATABASE_URL

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Generation/build do not connect. Migrations use direct/session mode, never the transaction pooler.
  datasource: { url: connection ? migrationUrl(connection) : '' },
})
