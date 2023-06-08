import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // ready is an event that fastify emits to know if the application has finished uploading the routes
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Mateus Raimundo',
      email: 'mateus@email.com',
      password: '123456',
    }) // let's create the user with the route because we want to simulate the user using the application

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'mateus@email.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie') // backend returns the Cookie in the response header

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
