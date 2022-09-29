import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({ example: 'string(256)' })
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({ example: 'string(6)' })
  @IsNotEmpty()
  roomId: string;
}

export class UpdateStoryDto extends CreateStoryDto {
  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  id: string;
}

export class CompleteStoryDto {
  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  id: string;
}
