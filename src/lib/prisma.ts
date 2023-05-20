import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [], // for show in log of application the query's just in development ambient
}) // create connection with database
