// NestJS imports
import { Module } from '@nestjs/common';

// Local imports
import { OrdersController } from './orders.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
