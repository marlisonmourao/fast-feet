import { DeliveryMan } from '@/domain/delivery/entrerprise/entities/deliveryman'

export abstract class DeliveryManRepository {
  abstract create(deliveryMan: DeliveryMan): Promise<void>
  abstract save(deliveryMan: DeliveryMan): Promise<void>
  abstract findById(id: string): Promise<DeliveryMan | null>
  abstract findByCpf(cpf: string): Promise<DeliveryMan | null>
  abstract delete(deliveryMan: DeliveryMan): Promise<void>
  abstract fetchDeliveryMan(): Promise<DeliveryMan[] | null>
}
