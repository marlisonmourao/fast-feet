import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Order } from '../entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderDeliveryUseCaseRequest {
  authorId: string
  recipientId: string
  deliveryManId?: string
  deliveryAddress: string
  dateOfWithdrawal?: Date
  deliveryDate?: Date
}

export class CreateOrderDeliveryUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({
    recipientId,
    deliveryManId,
    authorId,
    deliveryAddress,
    dateOfWithdrawal,
    deliveryDate,
  }: CreateOrderDeliveryUseCaseRequest) {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      deliveryManId: new UniqueEntityID(deliveryManId),
      authorId: new UniqueEntityID(authorId),
      deliveryAddress,
      dateOfWithdrawal,
      deliveryDate,
    })

    await this.orderRepository.create(order)

    return order
  }
}
