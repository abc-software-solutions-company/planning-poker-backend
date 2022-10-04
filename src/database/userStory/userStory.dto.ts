import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, MaxLength, Min } from 'class-validator';

export class CreateUserStoryDto {
  @ApiProperty({ example: 'uuid(36)' })
  @IsNotEmpty()
  @MaxLength(64)
  storyId: string;
}
export class UpdateUserStoryDto extends CreateUserStoryDto {
  @ApiProperty({ example: 'Fibonacci[0-21]' })
  @Min(1)
  @Max(21)
  @IsNumber()
  votePoint: number;
}
