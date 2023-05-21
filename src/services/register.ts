import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6) // 6 rounds
  const userWithSameEmail = await prisma.user.findUnique({
    // 'findUnique' find just records uniques or primary keys
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    // return reply.status(409).send() // error for when exist data duplicated - we don't can use 'reply' here because we want separate this part of part HTTP of application
    throw new Error('E-mail already exist!') // throw error
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
