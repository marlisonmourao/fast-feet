import { InMemoryDeliveryManRepository } from '@/test/repositories/in-memory-delivery-man-repository'

import { RegisterDeliveryManUseCase } from './register-delivery-man'
import { makeDeliveryMan } from '@/test/factores/make-delivery-man'

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository
let sut: RegisterDeliveryManUseCase

describe('Register an delivery man', () => {
  beforeAll(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository()
    sut = new RegisterDeliveryManUseCase(inMemoryDeliveryManRepository)
  })

  it('should be able to register delivery man', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '12345678901',
      password: '123456',
    })

    console.log(result.value)

    expect(result.value).toBeTruthy()
    expect(result.value).toEqual({
      deliveryMan: inMemoryDeliveryManRepository.items[0],
    })
  })
})
