import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  // all operations in database to will spend here
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      // 'findUnique' find just records uniques or primary keys
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    // 'Prisma' create the types of interaction with database - create, update, etc.
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
