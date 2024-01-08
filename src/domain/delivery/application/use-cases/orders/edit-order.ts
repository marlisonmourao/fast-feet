import { OrdersRepository } from '../../repositories/orders-repository'

interface EditOrderUseCaseRequest {
  orderId: string
  deliveryAddress: string
  status?: string
}

export class EditOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({ orderId, deliveryAddress, status }: EditOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.deliveryAddress = deliveryAddress
    order.status = status ?? order.status

    await this.orderRepository.save(order)

    return {}
  }
}
