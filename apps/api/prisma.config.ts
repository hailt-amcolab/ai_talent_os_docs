import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { migrationUrl } from './src/infra/database/config.ts'

const connection = process.env.DIRECT_URL || process.env.DATABASE_URL
const args = process.argv.slice(2)
if ((args.includes('db') && args.includes('push')) || (args.includes('migrate') && args.includes('reset'))) {
  throw new Error('Do not db push/migrate reset managed schemas; use reviewed migrations')
}
const planning = (args.includes('migrate') && (args.includes('dev') || args.includes('diff')))
  || (args.includes('db') && args.includes('pull'))
const external = process.env.PRISMA_AUTH_INVENTORY_JSON
  ? JSON.parse(process.env.PRISMA_AUTH_INVENTORY_JSON) as { tables: string[]; enums: string[] }
  : { tables: ['auth.users'], enums: [] as string[] }
if (planning && !process.env.PRISMA_AUTH_INVENTORY_JSON) {
  throw new Error('Use npm run db:dev / db:diff / db:pull: the complete Auth namespace must be external before schema planning')
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // Only the shadow database gets a minimal Auth stub. Never create/alter
    // Supabase-managed tables in a production migration.
    initShadowDb: 'CREATE SCHEMA IF NOT EXISTS auth; CREATE TABLE IF NOT EXISTS auth.users (id uuid PRIMARY KEY);',
  },
  experimental: { externalTables: true },
  tables: { external: external.tables },
  enums: { external: external.enums },
  // Generation/build do not connect. Migrations use direct/session mode, never the transaction pooler.
  datasource: {
    url: connection ? migrationUrl(connection) : '',
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL ? migrationUrl(process.env.SHADOW_DATABASE_URL) : undefined,
  },
})
