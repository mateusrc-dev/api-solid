import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const prismaUsersRepository = new PrismaUsersRepository() // now we can change this repository when wanting
  const useCase = new GetUserProfileUseCase(prismaUsersRepository) // this class will to receive our repository that we let's use

  return useCase
}
