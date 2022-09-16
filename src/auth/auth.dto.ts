import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 'token' })
  access_token: string;
}
