import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/entrerprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    await this.items.push(order)
  }

  async searchByAddress(deliveryAddress: string): Promise<Order[] | null> {
    const orders = this.items.filter((order) => {
      // Utilizando includes para verificar se o endereço contém a string pesquisada.
      return order.deliveryAddress.includes(deliveryAddress)
    })

    if (orders.length === 0) {
      return null
    }

    return orders
  }

  async findById(id: string) {
    const order = await this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async delete(order: Order) {
    const itemIndex = await this.items.findIndex((item) => item.id === order.id)

    this.items.splice(itemIndex, 1)
  }

  async save(order: Order) {
    const itemIndex = await this.items.findIndex((item) => item.id === order.id)

    this.items[itemIndex] = order
  }
}
