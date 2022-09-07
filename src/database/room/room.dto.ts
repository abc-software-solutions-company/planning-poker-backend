import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateRoomDto {
  @ApiProperty({ example: 'string(256)' })
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  hostUserId: string;
}

export class UpdateRoomDto extends CreateRoomDto {
  @ApiProperty({ example: 'number(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  @IsNumber()
  id: number;
}
