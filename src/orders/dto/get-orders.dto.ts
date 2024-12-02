// Third party imports
import { IsEnum, IsOptional } from 'class-validator';

// Local imports
import { OrderStatus } from '../enum';
import { PaginationDto } from '../../common';

export class GetOrdersDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  public status?: OrderStatus;
}
