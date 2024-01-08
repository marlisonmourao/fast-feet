import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { EditOrderUseCase } from './edit-order'
import { makeOrder } from '@/test/factores/make-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: EditOrderUseCase

describe('Edit Order', () => {
  beforeAll(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new EditOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to edit a order', async () => {
    const newOrder = makeOrder({}, new UniqueEntityID('1'))

    inMemoryOrdersRepository.create(newOrder)

    await sut.execute({
      orderId: new UniqueEntityID('1').toString(),
      deliveryAddress: 'Rua das flores',
      status: 'delivered',
    })

    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      deliveryAddress: 'Rua das flores',
      status: 'delivered',
    })
  })
})
