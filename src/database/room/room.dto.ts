import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'string(32)' })
  @IsNotEmpty()
  @MaxLength(32)
  name: string;
}
