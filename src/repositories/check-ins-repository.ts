import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> // 'CheckInUncheckedCreateInput' has relation fields with tables of users and academies that we can use to create the check-in
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> // find userId on some date
  save(checkIn: CheckIn): Promise<CheckIn>
}
