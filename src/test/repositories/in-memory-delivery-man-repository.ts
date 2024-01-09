import { DeliveryManRepository } from '@/domain/delivery/application/repositories/delivery-man-repository'
import { DeliveryMan } from '@/domain/delivery/entrerprise/entities/deliveryman'

export class InMemoryDeliveryManRepository implements DeliveryManRepository {
  public items: DeliveryMan[] = []

  async create(deliveryman: DeliveryMan) {
    await this.items.push(deliveryman)
  }

  async findById(id: string) {
    const deliveryman = await this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async findByCpf(cpf: string) {
    const deliveryman = await this.items.find(
      (item) => item.cpf.toString() === cpf,
    )

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async delete(deliveryman: DeliveryMan) {
    const itemIndex = await this.items.findIndex(
      (item) => item.id === deliveryman.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async save(deliveryman: DeliveryMan) {
    const itemIndex = await this.items.findIndex(
      (item) => item.id === deliveryman.id,
    )

    this.items[itemIndex] = deliveryman
  }

  async fetchDeliveryMan() {
    const deliveryMan = await this.items.map((item) => item)

    return deliveryMan
  }
}
