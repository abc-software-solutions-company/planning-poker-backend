import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
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
  @ApiProperty({ example: 'string(6)' })
  @IsNotEmpty()
  @MaxLength(6)
  id: string;
}
