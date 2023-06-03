import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const checkInsRepository = new PrismaCheckInsRepository() // now we can change this repository when wanting
  const useCase = new GetUserMetricsUseCase(checkInsRepository) // this class will to receive our repository that we let's use

  return useCase
}
