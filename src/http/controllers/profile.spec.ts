import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // ready is an event that fastify emits to know if the application has finished uploading the routes
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`) // send token in header
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'mateus@email.com' }),
    )
  })
})
