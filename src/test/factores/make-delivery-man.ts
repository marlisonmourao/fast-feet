import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryMan,
  DeliveryManProps,
} from '@/domain/delivery/entrerprise/entities/deliveryman'

export function makeDeliveryMan(
  override: Partial<DeliveryManProps> = {},
  id?: UniqueEntityID,
) {
  const newDeliveryMan = DeliveryMan.create(
    {
      name: faker.person.fullName(),
      city: faker.location.city(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )

  return newDeliveryMan
}
