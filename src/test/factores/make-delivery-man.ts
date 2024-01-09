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
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.phone.imei(),
      ...override,
    },
    id,
  )

  return newDeliveryMan
}
