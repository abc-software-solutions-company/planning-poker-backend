import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Huy' })
  @MinLength(1)
  @MaxLength(32)
  name: string;
}
export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ example: 'id' })
  @MinLength(16)
  @MaxLength(64)
  id: string;
}
