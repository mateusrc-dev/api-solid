import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      // we don't use other use case here
      name: 'Mateus',
      email: 'mateusraimundo1995@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'mateusraimundo1995@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // expect that 'user.id' to equal any string
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'mateusraimundo1995@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      // we don't use other use case here
      name: 'Mateus',
      email: 'mateusraimundo1995@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'mateusraimundo1995@email.com',
        password: '122123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
