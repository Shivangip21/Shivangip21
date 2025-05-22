import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrderService {
  private kafkaProducer;

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    const kafka = new Kafka({
      clientId: 'order-service',
      brokers: ['localhost:9092'], // change if needed
    });
    this.kafkaProducer = kafka.producer();
    this.kafkaProducer.connect();
  }

  async placeOrder(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      user: { id: userId },
      amount: createOrderDto.amount,
    });
    await this.orderRepository.save(order);

    // Emit Kafka event
    await this.kafkaProducer.send({
      topic: 'orders',
      messages: [
        {
          key: order.order_id.toString(),
          value: JSON.stringify({
            order_id: order.order_id,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });

    return order;
  }

  async getOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
