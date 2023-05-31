import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  // type of return of function CreateGymUseCase
  gym: Gym
}

export class CreateGymUseCase {
  // each class with use case will to unique method
  constructor(private gymsRepository: GymsRepository) {} // we let's get our dependencies in this 'constructor' how parameter - 'private' is a key word for transform 'usersRepository' in a property in class
  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    })
    return { gym }
  }
}
