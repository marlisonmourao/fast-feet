import { InMemoryDeliveryManRepository } from '@/test/repositories/in-memory-delivery-man-repository'
import { FindByIdDeliveryManUseCase } from './find-by-id-delivery-man'
import { makeDeliveryMan } from '@/test/factores/make-delivery-man'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { left } from '@/core/either'

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository
let sut: FindByIdDeliveryManUseCase

describe('Find by id delivery man use case', () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository()
    sut = new FindByIdDeliveryManUseCase(inMemoryDeliveryManRepository)
  })

  it('should be able to get a delivery man', async () => {
    const newDeliveryMan = makeDeliveryMan({}, new UniqueEntityID('12323'))

    inMemoryDeliveryManRepository.create(newDeliveryMan)

    const result = await sut.execute({
      id: newDeliveryMan.id.toString(),
    })

    expect(result.value).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.deliveryMan).toEqual(
        inMemoryDeliveryManRepository.items[0],
      )
    }
  })
})
