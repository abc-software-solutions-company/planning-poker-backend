import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class GeneratePoolDto {
  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @Max(1000000)
  num: number;
}
