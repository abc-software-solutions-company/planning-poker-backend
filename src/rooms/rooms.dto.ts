import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength, MinLength } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'room name' })
  @IsAlphanumeric()
  @MinLength(1)
  @MaxLength(256)
  name: string;
}
