import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  // type of return of function CreateGymUseCase
  gyms: Gym[]
}

export class SearchGymsUseCase {
  // each class with use case will to unique method
  constructor(private gymsRepository: GymsRepository) {} // we let's get our dependencies in this 'constructor' how parameter - 'private' is a key word for transform 'usersRepository' in a property in class
  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
