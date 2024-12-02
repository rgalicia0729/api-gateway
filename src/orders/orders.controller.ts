// NestJS imports
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Controller,
  Get,
  Post,
  Param,
  Inject,
  Body,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';

// Third-party imports
import { catchError } from 'rxjs';

// Local imports
import { envs } from '../config';
import { ChangeOrderStatusDto, CreateOrderDto, GetOrdersDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(envs.injectionToken) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.client.send({ cmd: 'CREATE_ORDER' }, body).pipe(
      catchError((error): never => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() query: GetOrdersDto) {
    return this.client.send({ cmd: 'FIND_ORDERS' }, query).pipe(
      catchError((error): never => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'FIND_ORDER' }, { id }).pipe(
      catchError((error): never => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id/status')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ChangeOrderStatusDto,
  ) {
    return this.client
      .send({ cmd: 'CHANGE_ORDER_STATUS' }, { id, ...body })
      .pipe(
        catchError((error): never => {
          throw new RpcException(error);
        }),
      );
  }
}
