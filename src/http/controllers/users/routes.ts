import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register) // recommend translating routes to entities

  app.post('/sessions', authenticate) // post because we let's send data in body

  app.patch('/token/refresh', refresh) // this router will only update the jwt - it will be called when the user loses his token to update it

  /* Routes to User Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile) // onRequest sends 'request' and 'reply' to 'verifyJWT' function before calling controller 'profile'
}
