import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class GeneratePoolDto {
  @ApiProperty({ example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  @Max(1000000)
  num: number;
}
