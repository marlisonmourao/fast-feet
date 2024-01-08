import { CreateOrderDeliveryUseCase } from './create-order-delivery'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../entities/order'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

const fakeOrdersRepositoty: OrdersRepository = {
  create: async (order: Order): Promise<void> => {},
}

test('create an order', async () => {
  const createOrder = new CreateOrderDeliveryUseCase(fakeOrdersRepositoty)

  const response = await createOrder.execute({
    deliveryAddress: 'Rua teste',
    authorId: new UniqueEntityID('1').toString(),
    recipientId: new UniqueEntityID('4').toString(),
  })

  expect(response.deliveryAddress).toEqual('Rua teste')
})
