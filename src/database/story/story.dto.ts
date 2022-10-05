import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({ example: 'string(6)' })
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ example: 'string(64)' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'string(256)' })
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}

export class UpdateStoryDto {
  @ApiProperty({ example: 'uuid(36)' })
  @IsNotEmpty()
  @MaxLength(64)
  id: string;

  @ApiProperty({ example: 'string(256)' })
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}

export class CompleteStoryDto {
  @ApiProperty({ example: 'uuid(36)' })
  @IsNotEmpty()
  @MaxLength(64)
  id: string;
}
