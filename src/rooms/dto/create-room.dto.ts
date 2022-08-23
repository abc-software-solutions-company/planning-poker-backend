import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: 'room name' })
  name: string;
}
