// NestJS imports
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// Third-party imports
import { catchError } from 'rxjs';

// Local imports
import { envs } from '../config';
import { PaginationDto } from '../common';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(envs.injectionToken)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.client.send({ cmd: 'CREATE_PRODUCT' }, body);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.client.send({ cmd: 'FIND_PRODUCTS' }, query).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'FIND_PRODUCT' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.client.send({ cmd: 'UPDATE_PRODUCT' }, { id, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'DELETE_PRODUCT' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
