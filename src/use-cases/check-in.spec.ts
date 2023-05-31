import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository) // here we need the repository that we are going to use - let's put a dummy repository so that this file has no relation to the repository external to this file - this is a test unitary

    await gymsRepository.create({
      // we need to create this gym so that the tests don't give an error
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -5.1136563,
      longitude: -42.8001405,
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
      userLatitude: -5.1136563,
      userLongitude: -42.8001405,
    })

    expect(checkIn.id).toEqual(expect.any(String)) // expect that 'checkIn.id' to equal any string
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // we let' insert a dummy date - now the check-ins to will created in same date

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.1136563,
      userLongitude: -42.8001405,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -5.1136563,
        userLongitude: -42.8001405,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError) // we let's use the error instance global, it works with any error
  })

  it('should be able to check in twice but in the different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // we let' insert a dummy date - now the check-ins to will created in different date

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.1136563,
      userLongitude: -42.8001405,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.1136563,
      userLongitude: -42.8001405,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      // we need to create this gym so that the tests don't give an error
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-5.0887357),
      longitude: new Decimal(-42.8001406),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -5.1136563,
        userLongitude: -42.8001405,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
