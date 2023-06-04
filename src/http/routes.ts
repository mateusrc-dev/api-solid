import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/users', register) // recommend translating routes to entities

  app.post('/sessions', authenticate) // post because we let's send data in body

  /* Routes to User Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile) // onRequest sends 'request' and 'reply' to 'verifyJWT' function before calling controller 'profile'
}
