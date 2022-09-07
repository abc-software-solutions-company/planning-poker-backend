import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, MaxLength, Min } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  userId: string;

  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  storyId: string;

  @ApiProperty({ example: 'Fibonacci[0-21]' })
  @Min(1)
  @Max(21)
  @IsNumber()
  votePoint: number;
}
export class UpdateResultDto extends CreateResultDto {}
