// NestJS imports
import { Module } from '@nestjs/common';

// Local imports
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule],
})
export class AppModule {}
