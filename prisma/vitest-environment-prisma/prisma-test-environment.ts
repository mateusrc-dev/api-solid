import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    // postgresql://docker:docker@localhost:5432/apisolid?schema=public // let's get the database url in env and change only the schema at the end
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL) // URL is a global class inside 'node' - this class will to read the database url

  url.searchParams.set('schema', schema) // 'schema=public' is a query parameter - let's swap the query value with the value we received in the function parameter

  return url.toString()
}

export default <Environment>{
  // let's create an environment to use in isolated tests
  name: 'prisma',
  async setup() {
    // code that will be executed before each file of tests
    // i want create a database unique for each tests file
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL // overwrite the environment variable with the url of the database that will be used in each test file

    execSync('npx prisma migrate deploy') // for execute a command in terminal - word 'deploy' is to create the database with the migrations that already exist - the word 'deploy' is to skip checking if there is something new in the database

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      }, // code that will be executed after each file of tests
    }
  },
}
