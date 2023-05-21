import fastify from 'fastify'
import { AppRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(AppRoutes) // we let's register a plugin responsibility by routes

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    // if error is a error validation (of zod)
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() }) // 400 = bad request
  }

  if (env.NODE_ENV !== 'production') {
    // for errors show in terminal
    console.error(error)
  } else {
    // depois usar aplicações para observar os erros em produção...
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
