import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // it will only look in the request cookie to see if the refresh token exists - if there is no error, it means the refresh token has not expired

  const token = await reply.jwtSign({}, { sign: { sub: request.user.sub } }) // method to create new token

  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: request.user.sub, expiresIn: '7d' } },
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
}
