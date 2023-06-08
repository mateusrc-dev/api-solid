import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Mateus Raimundo',
    email: 'mateus@email.com',
    password: '123456',
  }) // let's create the user with the route because we want to simulate the user using the application

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'mateus@email.com',
    password: '123456',
  })

  const { token } = authResponse.body
  return { token }
}
