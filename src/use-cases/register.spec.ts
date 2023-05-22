import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository()
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

    const { user } = await registerUseCase.execute({
      name: 'Mateus',
      email: 'mateusrc-dev@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // expect that 'user.id' to equal any string
  })

  it('should hash user password upon registration', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository()
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

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

  it('should not be able to register with same email twice', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository()
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

    const email = 'mateusrc-dev@email.com'

    await registerUseCase.execute({
      name: 'Mateus',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        // this function is a promise, then the return is success or reject
        name: 'Mateus',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError) // expect that this promise return a reject with instance error specific
  })
})
