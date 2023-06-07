import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // all routes inside the file will call this middleware to check if the user is authenticated

  app.get('/gyms/search', search)

  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
