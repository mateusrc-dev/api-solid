import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body) // parse do a 'throw' automatic of error

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({}, { sign: { sub: user.id } }) // method to create new token

    return reply.status(200).send({ token }) // 200 = success - 201 is for create resource
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message }) // 400 indicate bad request
    }

    // if it's not a known error...
    throw err // let's let a higher application layer handle this (the fastify)
  }
}
