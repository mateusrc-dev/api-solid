import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const gymsRepository = new PrismaGymsRepository() // now we can change this repository when wanting
  const useCase = new CreateGymUseCase(gymsRepository) // this class will to receive our repository that we let's use

  return useCase
}
