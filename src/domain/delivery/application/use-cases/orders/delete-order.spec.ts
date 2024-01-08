import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from '@/test/factores/make-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete Order', () => {
  beforeAll(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new DeleteOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to delete a order', async () => {
    const newOrder = makeOrder({}, new UniqueEntityID('1'))

    inMemoryOrdersRepository.create(newOrder)

    await sut.execute({
      orderId: newOrder.id.toString(),
    })

    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })
})
