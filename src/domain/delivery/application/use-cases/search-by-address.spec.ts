import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { SearchByAddressUseCase } from './search-by-address'
import { Order } from '../../entrerprise/entities/order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: SearchByAddressUseCase

describe('Search by delivery address', () => {
  beforeAll(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new SearchByAddressUseCase(inMemoryOrdersRepository)
  })

  it('should be able to search address', async () => {
    const newOrder = Order.create({
      authorId: new UniqueEntityID('1'),
      recipientId: new UniqueEntityID('4'),
      deliveryAddress: 'Bairro Jardim das flores',
    })

    await inMemoryOrdersRepository.create(newOrder)

    const { orders } = await sut.execute({
      deliveryAddress: 'Jardim',
    })

    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          deliveryAddress: 'Bairro Jardim das flores',
        }),
      ]),
    )
  })
})
