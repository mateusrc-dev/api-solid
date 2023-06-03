import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUseCheckInsHistoryUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const checkInsRepository = new PrismaCheckInsRepository() // now we can change this repository when wanting
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository) // this class will to receive our repository that we let's use

  return useCase
}
