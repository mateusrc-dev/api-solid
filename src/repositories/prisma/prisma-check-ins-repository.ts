import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // here this date to will return with zero hour
    const endOfTheDay = dayjs(date).endOf('date') // returns last valid time of day

    // database saves dates with times

    const checkIn = await prisma.checkIn.findFirst({
      // I want to find a unique check-in with the conditions that I'm going to put here
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // fetching check in created after the start of that day - prism only accepts date in js format
          lte: endOfTheDay.toDate(), // fetching check in created before the end of that day
        }, // created_at not have index unique, so we use 'findFirst' method
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },

      take: 20, // how many items i want to bring
      skip: (page - 1) * 20, // how many items i want to skip
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
