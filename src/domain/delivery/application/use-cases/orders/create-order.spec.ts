import { CreateOrderUseCase } from './create-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create an order', () => {
  beforeAll(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create a order', async () => {
    const response = await sut.execute({
      deliveryAddress: 'Rua teste',
      authorId: new UniqueEntityID('1').toString(),
      recipientId: new UniqueEntityID('4').toString(),
    })

    expect(response.order.deliveryAddress).toEqual('Rua teste')
  })
})
