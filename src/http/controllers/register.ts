import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body) // parse do a 'throw' automatic of error
  const password_hash = await hash(password, 6) // 6 rounds
  const userWithSameEmail = await prisma.user.findUnique({
    // 'findUnique' find just records uniques or primary keys
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send() // error for when exist data duplicated
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
