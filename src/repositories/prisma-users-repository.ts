import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  // all operations in database to will spend here
  async create(data: Prisma.UserCreateInput) {
    // 'Prisma' create the types of interaction with database - create, update, etc.
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
