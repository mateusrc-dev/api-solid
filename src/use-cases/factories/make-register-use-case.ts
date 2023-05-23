import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  // this factory to will help the put more dependencies in use-cases
  const prismaUsersRepository = new PrismaUsersRepository() // now we can change this repository when wanting
  const registerUseCase = new RegisterUseCase(prismaUsersRepository) // this class will to receive our repository that we let's use

  return registerUseCase
}
