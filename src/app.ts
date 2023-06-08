import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkIns } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  // now new methods jwt will be appended in request and response
  secret: env.JWT_SECRET, // keyword that will be used to create the token
})

app.register(usersRoutes) // we let's register a plugin responsibility by routes
app.register(gymsRoutes)
app.register(checkIns)

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
