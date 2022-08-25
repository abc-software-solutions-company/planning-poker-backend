import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({ example: 'story name' })
  @MinLength(1)
  @MaxLength(256)
  name: string;
}

export class UpdateStoryDto {
  @ApiProperty({ example: 'id' })
  @MinLength(16)
  @MaxLength(64)
  id: string;

  @ApiProperty({ example: 'story name' })
  @MinLength(1)
  @MaxLength(256)
  name?: string;

  @ApiProperty({ example: 10 })
  @Min(1)
  @Max(21)
  @IsNumber()
  point?: number;
}
