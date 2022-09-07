import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateActDto {
  @ApiProperty({ example: 'uuid(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  userId: string;

  @ApiProperty({ example: 'bigint(64)' })
  @IsNotEmpty()
  @MaxLength(64)
  @IsNumber()
  roomId: number;
}

export class UpdateActDto extends CreateActDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isOnline: boolean;
}
