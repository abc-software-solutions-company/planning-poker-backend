import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MaxLength, MinLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateRoomDto {
  @ApiProperty({ example: 'string' })
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @ApiProperty({ example: 'uuid' })
  @MinLength(1)
  @MaxLength(64)
  hostUserId: string;
}

export class UpdateRoomDto extends CreateRoomDto {
  @ApiProperty({ example: 'number' })
  @MinLength(1)
  @MaxLength(64)
  @IsNumber()
  id: number;
}
