import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
export class FindProductDto {
  @IsString()
  category: string;

  @IsNumber()
  limit: number;
}
