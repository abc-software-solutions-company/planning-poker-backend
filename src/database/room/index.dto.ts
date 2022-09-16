import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'string(256)' })
  @IsNotEmpty()
  @MaxLength(32)
  name: string;
}

export class UpdateRoomDto extends CreateRoomDto {
  @ApiProperty({ example: 'string(5)' })
  @IsNotEmpty()
  @MaxLength(5)
  id: string;

  @ApiProperty({ example: 'uuid(64)' })
  @MaxLength(64)
  hostUserId: string;
}
