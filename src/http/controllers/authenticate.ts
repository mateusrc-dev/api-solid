import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body) // parse do a 'throw' automatic of error

  const prismaUsersRepository = new PrismaUsersRepository() // now we can change this repository when wanting
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository) // this class will to receive our repository that we let's use

  try {
    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message }) // 400 indicate bad request
    }

    // if it's not a known error...
    throw err // let's let a higher application layer handle this (the fastify)
  }

  return reply.status(200).send() // 200 = success - 201 is for create resource
}
