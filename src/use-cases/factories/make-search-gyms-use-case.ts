import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const gymsRepository = new PrismaGymsRepository() // now we can change this repository when wanting
  const useCase = new SearchGymsUseCase(gymsRepository) // this class will to receive our repository that we let's use

  return useCase
}
