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

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: '7d' } },
    ) // method to create refresh token - if the user doesn't sign in the app in 7 days then the refresh token won't exist for the user to continue inside the app

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // let's say which routes will access our cookie - all backend can read this cookie
        secure: true, // HTTPs - frontend will not be able to read the value of this cookie
        sameSite: true, // the cookie will only be accessible within the same website
        httpOnly: true, // the cookie will only be accessible within the backend in requests context
      }) // refresh token will be accessible in context of our requests
      .status(200)
      .send({ token }) // 200 = success - 201 is for create resource
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message }) // 400 indicate bad request
    }

    // if it's not a known error...
    throw err // let's let a higher application layer handle this (the fastify)
  }
}
