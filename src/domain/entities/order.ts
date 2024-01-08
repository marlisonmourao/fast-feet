import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

interface OrdersProps {
  authorId: UniqueEntityID
  recipientId: UniqueEntityID
  deliveryManId?: UniqueEntityID
  deliveryAddress: string
  status: string
  createdAt: Date
  dateOfWithdrawal?: Date
  deliveryDate?: Date
  updatedAt?: Date
}

export class Order extends Entity<OrdersProps> {
  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  set deliveryAddress(deliveryAddress: string) {
    this.props.deliveryAddress = deliveryAddress
  }

  get authorId() {
    return this.props.authorId
  }

  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get dateOfWithdrawal() {
    return this.props.dateOfWithdrawal
  }

  set dateOfWithdrawal(dateOfWithdrawal: Date | undefined) {
    this.props.dateOfWithdrawal = dateOfWithdrawal
  }

  set deliveryDate(deliveryDate: Date | undefined) {
    this.props.deliveryDate = deliveryDate
  }

  get deliveryDate() {
    return this.props.deliveryDate
  }

  get UpdatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrdersProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        createdAt: new Date(),
        status: 'waiting',
      },
      id,
    )

    return order
  }
}
