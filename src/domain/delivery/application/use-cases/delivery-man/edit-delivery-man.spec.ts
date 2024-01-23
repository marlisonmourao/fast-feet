import { InMemoryDeliveryManRepository } from '@/test/repositories/in-memory-delivery-man-repository'

import { EditDeliveryManUseCase } from './edit-delivery-man'
import { makeDeliveryMan } from '@/test/factores/make-delivery-man'

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository
let sut: EditDeliveryManUseCase

describe('Register an delivery man', () => {
  beforeAll(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository()
    sut = new EditDeliveryManUseCase(inMemoryDeliveryManRepository)
  })

  it('should be able to register delivery man', async () => {
    const newDeliveryMan = makeDeliveryMan({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '12345678901',
      password: '123456',
    })

    inMemoryDeliveryManRepository.create(newDeliveryMan)

    const result = await sut.execute({
      id: newDeliveryMan.id.toString(),
      name: 'Marlison Mourão',
      email: 'marlisonmourao@email.com',
      cpf: '323121323',
      password: '9877655533',
    })

    expect(result.value).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.deliveryMan).toEqual(
        inMemoryDeliveryManRepository.items[0],
      )
    }
  })
})
