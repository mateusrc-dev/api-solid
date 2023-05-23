import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary
  }) // function that we can use inside of 'describe' - 'beforeEach' execute before each tests

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Mateus',
      email: 'mateusrc-dev@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // expect that 'user.id' to equal any string
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'mateusrc-dev@email.com'

    await sut.execute({
      name: 'Mateus',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        // this function is a promise, then the return is success or reject
        name: 'Mateus',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError) // expect that this promise return a reject with instance error specific
  })
})
