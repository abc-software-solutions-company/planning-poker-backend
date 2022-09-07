import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './result.controller';
import { Result } from './result.entity';
import { ResultsService } from './result.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  providers: [ResultsService],
  controllers: [ResultsController],
  exports: [ResultsService],
})
export class ResultsModule {}
