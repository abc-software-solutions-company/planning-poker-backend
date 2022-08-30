import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserStoryRoomDto {
  @ApiProperty({ example: 'string' })
  @MinLength(16)
  @MaxLength(64)
  userId: string;

  @ApiProperty({ example: 'string' })
  @MinLength(16)
  @MaxLength(64)
  storyId: string;

  @ApiProperty({ example: 'number' })
  @MinLength(16)
  @MaxLength(64)
  @IsNumber()
  roomId: number;
}

export class UpdateUserStoryRoomDto extends CreateUserStoryRoomDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({ example: 'Fibonacci number [1-21]' })
  @Min(1)
  @Max(21)
  @IsNumber()
  @IsNumber()
  storyPoint: number;
}
