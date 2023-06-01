import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  // type of return of function CreateGymUseCase
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  // each class with use case will to unique method
  constructor(private gymsRepository: GymsRepository) {} // we let's get our dependencies in this 'constructor' how parameter - 'private' is a key word for transform 'usersRepository' in a property in class
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
