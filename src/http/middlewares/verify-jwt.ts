// this middleware will intercept all routes the user needs to be authorized

import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify() // jwt token is being sent by request header - 'jwt Verify' verify if the token send in request to did create by our application - an error will occur if the token is invalid - this function also puts user data into a 'user' variable
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
