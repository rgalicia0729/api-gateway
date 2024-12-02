// Third import
import { IsEnum } from 'class-validator';

// Local import
import { OrderStatus } from '../enum';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatus)
  public status: OrderStatus;
}
