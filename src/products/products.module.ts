// NestJS imports
import { Module } from '@nestjs/common';

// Local imports
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
