import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validate-error'
interface ValidateCheckInUseCaseRequest {
  // types for use case output and input data
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {} // to receive the use case dependencies

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    // in use case we have only one exclusive method
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at, // here placed a date in the past
      'minutes',
    ) // the 'diff' method returns the distance between dates - we can specify which type of distance we want (in minutes, days, months, years)

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
