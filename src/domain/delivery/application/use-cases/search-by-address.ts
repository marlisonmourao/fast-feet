import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '@/domain/delivery/entrerprise/entities/order'

interface SearchByAddressUseCaseRequest {
  deliveryAddress: string
}

interface SearchByAddressUseCaseResponse {
  orders: Order[] | null
}

export class SearchByAddressUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({
    deliveryAddress,
  }: SearchByAddressUseCaseRequest): Promise<SearchByAddressUseCaseResponse> {
    const orders = await this.orderRepository.searchByAddress(deliveryAddress)

    return {
      orders,
    }
  }
}
