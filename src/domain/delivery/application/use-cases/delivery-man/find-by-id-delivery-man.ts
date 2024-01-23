import { Either, left, right } from '@/core/either'
import { DeliveryMan } from '@/domain/delivery/entrerprise/entities/deliveryman'
import { DeliveryManRepository } from '../../repositories/delivery-man-repository'

interface FindByIdDeliveryManUseCaseRequest {
  id: string
}

type FindByIdDeliveryManUseCaseResponse = Either<
  Error,
  {
    deliveryMan: DeliveryMan
  }
>

export class FindByIdDeliveryManUseCase {
  constructor(private deliveryManRepository: DeliveryManRepository) {}

  async execute({
    id,
  }: FindByIdDeliveryManUseCaseRequest): Promise<FindByIdDeliveryManUseCaseResponse> {
    const deliveryMan = await this.deliveryManRepository.findById(id)

    if (!deliveryMan) {
      return left(new Error('Delivery man not found.'))
    }

    return right({
      deliveryMan,
    })
  }
}
