import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Huy' })
  name: string;
  @ApiProperty({ example: true })
  isHost?: boolean;
}
