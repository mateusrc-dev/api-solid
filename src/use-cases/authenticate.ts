import { UsersRepository } from '@/repositories/users.repository'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  // types for use case output and input data
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateCase {
  constructor(private usersRepository: UsersRepository) {} // to receive the use case dependencies

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // in use case we have only one exclusive method
    // this method to will do auth
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    // Boolean => boolean variables can start with: 'is', 'has', 'does'
    const doesPasswordMatches = await compare(password, user.password_hash) // compare password with hash with a password without hash - if matches

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
