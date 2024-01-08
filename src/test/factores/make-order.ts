import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Order,
  OrdersProps,
} from '@/domain/delivery/entrerprise/entities/order'

export function makeOrder(
  override: Partial<OrdersProps> = {},
  id?: UniqueEntityID,
) {
  const newOrder = Order.create(
    {
      authorId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      deliveryAddress: faker.location.streetAddress(),
      ...override,
    },
    id,
  )

  return newOrder
}
