import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }), // with 'refine' we can create our validation
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }), // with 'refine' we can create our validation
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params) // parse do a 'throw' automatic of error
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body) // parse do a 'throw' automatic of error

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub, // we can access this information because the user has logged in
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
