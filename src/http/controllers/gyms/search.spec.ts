import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // ready is an event that fastify emits to know if the application has finished uploading the routes
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`) // send token in header
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -5.0887357,
        longitude: -42.8001406,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`) // send token in header
      .send({
        title: 'TypeScript Gym',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -5.0887357,
        longitude: -42.8001406,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'JavaScript',
      })
      .set('Authorization', `Bearer ${token}`) // send token in header of request
      .send() // this is body of request

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      // it has to be the same as the array with an object inside it
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
