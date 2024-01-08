import { OrdersRepository } from '../../repositories/orders-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({ orderId }: DeleteOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    await this.orderRepository.delete(order)

    return {}
  }
}
