import { DeliveryMan } from '@/domain/delivery/entrerprise/entities/deliveryman'
import { DeliveryManRepository } from '../../repositories/delivery-man-repository'

import { hash } from 'bcrypt'
import { Either, left, right } from '@/core/either'

export interface EditDeliveryManUseCaseRequest {
  id: string
  name: string
  email: string
  cpf: string
  password: string
}

export type EditDeliveryManUseCaseResponse = Either<
  Error,
  {
    deliveryMan: DeliveryMan
  }
>

export class EditDeliveryManUseCase {
  constructor(private deliveryManRepository: DeliveryManRepository) {}

  async execute({
    id,
    name,
    email,
    cpf,
    password,
  }: EditDeliveryManUseCaseRequest): Promise<EditDeliveryManUseCaseResponse> {
    const deliveryManWithSameCpf = await this.deliveryManRepository.findById(id)

    if (!deliveryManWithSameCpf) {
      return left(new Error('Delivery man not found.'))
    }

    const deliveryMan = DeliveryMan.create(
      {
        name,
        email,
        cpf,
        password: await hash(password, 10),
      },
      deliveryManWithSameCpf.id,
    )

    await this.deliveryManRepository.save(deliveryMan)

    return right({
      deliveryMan,
    })
  }
}
