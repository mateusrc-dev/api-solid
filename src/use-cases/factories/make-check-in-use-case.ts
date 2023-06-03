import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const checkInsRepository = new PrismaCheckInsRepository() // now we can change this repository when wanting
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository) // this class will to receive our repository that we let's use

  return useCase
}
