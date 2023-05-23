import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  // each class with use case will to unique method
  constructor(private usersRepository: UsersRepository) {} // we let's get our dependencies in this 'constructor' how parameter - 'private' is a key word for transform 'usersRepository' in a property in class
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    // const password_hash = await hash(password, 6) // 6 rounds
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError() // throw error
    }

    return { user }
  }
}
