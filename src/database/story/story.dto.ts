import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({ example: 'string' })
  @MinLength(1)
  @MaxLength(256)
  name: string;
}

export class UpdateStoryDto extends CreateStoryDto {
  @ApiProperty({ example: 'id' })
  @MinLength(16)
  @MaxLength(64)
  id: string;

  @ApiProperty({ example: 'number [1-21]' })
  @Min(1)
  @Max(21)
  @IsNumber()
  avgPoint: number;
}
