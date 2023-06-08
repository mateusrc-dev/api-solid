import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // ready is an event that fastify emits to know if the application has finished uploading the routes
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      // we can crate a gym with prisma
      data: {
        title: 'JavaScript Gym',
        latitude: -5.0887357,
        longitude: -42.8001406,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`) // send token in header
      .send({
        latitude: -5.0887357,
        longitude: -42.8001406,
      })

    expect(response.statusCode).toEqual(201)
  })
})
