import 'dotenv/config' // loading ambient variable
import { z } from 'zod'

// process.env: { NODE_ENV: 'dev', ... }

const envSchema = z.object({ // the loaded environment variable will be an object
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // we need this variable so that it is possible for external environments to insert this value
})

const _env = envSchema.safeParse(process.env) // 'safeParse' try validate the data in 'process.env'

if (_env.success === false) {
  console.error('❌Invalid environment variables!❌', _env.error.format())

  throw new Error('Invalid environment variables!') // let's use 'throw' for that the code doesn't keep running
}

export const env = _env.data // data is to get the data of 'env'