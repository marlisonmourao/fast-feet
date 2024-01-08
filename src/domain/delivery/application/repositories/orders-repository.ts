import { Order } from '@/domain/delivery/entrerprise/entities/order'

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>
  abstract searchByAddress(deliveryAddress: string): Promise<Order[] | null>
}
