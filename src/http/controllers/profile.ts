import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify() // // jwt token is being sent by request header - 'jwt Verify' verify if the token send in request to did create by our application - an error will occur if the token is invalid - this function also puts user data into a 'user' variable

  console.log(request.user.sub) // sub have id of user

  return reply.status(200).send() // 200 = success - 201 is for create resource
}
