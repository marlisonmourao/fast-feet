import { Order } from '@/domain/delivery/entrerprise/entities/order'

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>
  abstract searchByAddress(deliveryAddress: string): Promise<Order[] | null>
  abstract findById(id: string): Promise<Order | null>
  abstract delete(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
}
