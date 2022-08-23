import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto {
  @ApiProperty({ example: 'story name' })
  name: string;
}
