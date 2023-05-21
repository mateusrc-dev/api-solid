import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body) // parse do a 'throw' automatic of error

  const prismaUsersRepository = new PrismaUsersRepository() // now we can change this repository when wanting
  const registerUseCase = new RegisterUseCase(prismaUsersRepository) // this class will to receive our repository that we let's use

  try {
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
