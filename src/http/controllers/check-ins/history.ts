import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUseCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1), // all information sent in 'req.query' are strings, coerce is to convert to number
  })

  const { page } = checkInsHistoryBodySchema.parse(request.body) // parse do a 'throw' automatic of error

  const fetchUserCheckInsHistoryUseCase = makeFetchUseCheckInsHistoryUseCase()

  const checkIns = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
