import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // ready is an event that fastify emits to know if the application has finished uploading the routes
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Mateus Raimundo',
      email: 'mateus@email.com',
      password: '123456',
    }) // 'node' native server inside 'app', the fastify instance

    expect(response.statusCode).toEqual(201) // test that verifies that the user was successfully created
  })
})
