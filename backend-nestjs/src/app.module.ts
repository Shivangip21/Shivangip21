import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { Order } from './orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'mysql',
  // host and port are omitted when using socket
  username: 'root',
  password: 'shivangi21',
  database: 'tyreplex',
  entities: [Order],
  synchronize: true,
  extra: {
    socketPath: '/tmp/mysql.sock',
  },
}),

    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
