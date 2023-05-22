import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  // type of return of function RegisterUseCase
  user: User
}
export class RegisterUseCase {
  // each class with use case will to unique method
  constructor(private usersRepository: UsersRepository) {} // we let's get our dependencies in this 'constructor' how parameter - 'private' is a key word for transform 'usersRepository' in a property in class
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6) // 6 rounds
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError() // throw error
    }
    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
    return { user }
  }
}
