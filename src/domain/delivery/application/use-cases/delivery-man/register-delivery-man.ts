import { DeliveryMan } from '@/domain/delivery/entrerprise/entities/deliveryman'
import { DeliveryManRepository } from '../../repositories/delivery-man-repository'

import { hash } from 'bcrypt'
import { Either, left, right } from '@/core/either'

export interface RegisterDeliveryManUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

export type RegisterDeliveryManUseCaseResponse = Either<
  Error,
  {
    deliveryMan: DeliveryMan
  }
>

export class RegisterDeliveryManUseCase {
  constructor(private deliveryManRepository: DeliveryManRepository) {}

  async execute({
    name,
    email,
    cpf,
    password,
  }: RegisterDeliveryManUseCaseRequest): Promise<RegisterDeliveryManUseCaseResponse> {
    const deliveryManWithSameCpf =
      await this.deliveryManRepository.findByCpf(cpf)

    if (deliveryManWithSameCpf) {
      return left(new Error('Delivery man already exists'))
    }

    const passwordHash = await hash(password, 8)

    const deliveryMan = DeliveryMan.create({
      name,
      email,
      cpf,
      password: passwordHash,
    })

    await this.deliveryManRepository.create(deliveryMan)

    return right({
      deliveryMan,
    })
  }
}
