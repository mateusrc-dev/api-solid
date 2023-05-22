import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    }) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

    const { user } = await registerUseCase.execute({
      name: 'Mateus',
      email: 'mateusraimundo1995@email.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      // let's compare the passwords to see if they are the same if hashed
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
