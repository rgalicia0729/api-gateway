// NestJS imports
import { PartialType } from '@nestjs/mapped-types';

// Local imports
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
