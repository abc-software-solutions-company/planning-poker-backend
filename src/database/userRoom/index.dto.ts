import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserRoomDto {
  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  userId: string;

  @ApiProperty({ example: 'string(6)' })
  @IsNotEmpty()
  @MaxLength(6)
  roomId: string;
}

export class UpdateUserRoomDto extends CreateUserRoomDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isOnline: boolean;
}
