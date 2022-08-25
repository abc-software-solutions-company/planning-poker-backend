import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Huy' })
  name: string;
}
export class UpdateUserDto {
  @ApiProperty({ example: 'id' })
  @MinLength(16)
  @MaxLength(64)
  id: string;

  @ApiProperty({ example: 'Huy' })
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isHost?: boolean;
}
