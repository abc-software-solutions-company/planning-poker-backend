import { ApiProperty } from '@nestjs/swagger';

export class CreateUserStoryRoomDto {
  @ApiProperty({ example: 'string' })
  userId: string;

  @ApiProperty({ example: 'string' })
  storyId: string;

  @ApiProperty({ example: '1' })
  roomId: number;

  isOnline: boolean;

  storyPoint: number;
}
