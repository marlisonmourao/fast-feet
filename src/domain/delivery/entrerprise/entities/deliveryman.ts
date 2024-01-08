import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DeliveryManProps {
  name: string
  phone: string
  city: string
}

export class DeliveryMan extends Entity<DeliveryManProps> {
  get name() {
    return this.props.name
  }

  static create(props: DeliveryManProps, id?: UniqueEntityID) {
    const deliveryMan = new DeliveryMan(props, id)

    return deliveryMan
  }
}
