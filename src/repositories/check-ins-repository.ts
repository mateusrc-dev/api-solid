import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> // 'CheckInUncheckedCreateInput' has relation fields with tables of users and academies that we can use to create the check-in

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> // find userId on some date
}
