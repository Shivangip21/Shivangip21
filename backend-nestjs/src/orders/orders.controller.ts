import { Controller, Post, Body, Get, Req, UseGuards, UnauthorizedException, Param } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

@Post()
async placeOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
  if (!req.user || !req.user.id) {
    throw new UnauthorizedException('User not authenticated');
  }    
  const userId = req.user.id;

  return await this.orderService.placeOrder(userId, createOrderDto);
}

  @Get()
  async getOrders(@Req() req) {
    const userId = req.user.id;
    return this.orderService.getOrders(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.findOneById(id);
  }

}
