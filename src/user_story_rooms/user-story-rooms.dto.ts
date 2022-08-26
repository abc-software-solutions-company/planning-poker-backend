import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserStoryRoomDto {
  @ApiProperty({ example: 'userId' })
  @MinLength(16)
  @MaxLength(64)
  userId: string;

  @ApiProperty({ example: 'storyId' })
  @MinLength(16)
  @MaxLength(64)
  storyId: string;

  @ApiProperty({ example: 1 })
  @MinLength(16)
  @MaxLength(64)
  @IsNumber()
  roomId: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  isHost: boolean;
}

export class UpdateUserStoryRoomDto extends CreateUserStoryRoomDto {
  @ApiProperty({ example: 10 })
  @Min(1)
  @Max(21)
  @IsNumber()
  storyPoint: number;
}
