import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

    gymsRepository.items.push({
      // we need to create this gym so that the tests don't give an error
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers() // here we are going to create a dummy date data - create 'mocking' before of each tests
  }) // function that we can use inside of 'describe' - 'beforeEach' execute before each tests

  afterEach(() => {
    vi.useRealTimers() // after the testes we will use real dates
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.0682013,
      userLongitude: -42.7969367,
    })

    expect(checkIn.id).toEqual(expect.any(String)) // expect that 'checkIn.id' to equal any string
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // we let' insert a dummy date - now the check-ins to will created in same date

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.0682013,
      userLongitude: -42.7969367,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -5.0682013,
        userLongitude: -42.7969367,
      }),
    ).rejects.toBeInstanceOf(Error) // we let's use the error instance global, it works with any error
  })

  it('should be able to check in twice but in the different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // we let' insert a dummy date - now the check-ins to will created in different date

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.0682013,
      userLongitude: -42.7969367,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.0682013,
      userLongitude: -42.7969367,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
