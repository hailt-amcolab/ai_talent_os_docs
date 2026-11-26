import type { Database } from '../infra/database/client.ts'

// What a Control Plane step needs from a Prisma transaction client (raw SQL only, migrations are the schema authority).
export type Tx = Pick<Database, '$queryRaw' | '$executeRaw'>
