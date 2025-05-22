import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.orderService.placeOrder(userId, createOrderDto);
  }

  @Get()
  async getOrders(@Req() req) {
    const userId = req.user.id;
    return this.orderService.getOrders(userId);
  }
}
