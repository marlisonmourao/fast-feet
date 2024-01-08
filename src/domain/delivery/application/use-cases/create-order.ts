import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '@/domain/delivery/entrerprise/entities/order'

interface CreateOrderUseCaseRequest {
  authorId: string
  recipientId: string
  deliveryManId?: string
  deliveryAddress: string
  dateOfWithdrawal?: Date
  deliveryDate?: Date
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({
    recipientId,
    deliveryManId,
    authorId,
    deliveryAddress,
    dateOfWithdrawal,
    deliveryDate,
  }: CreateOrderUseCaseRequest) {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      deliveryManId: new UniqueEntityID(deliveryManId),
      authorId: new UniqueEntityID(authorId),
      deliveryAddress,
      dateOfWithdrawal,
      deliveryDate,
    })

    await this.orderRepository.create(order)

    return {
      order,
    }
  }
}
