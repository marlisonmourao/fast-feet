import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface RecipientProps {
  name: string
}

export class DeliveryMan extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const deliveryMan = new DeliveryMan(props, id)

    return deliveryMan
  }
}
