import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { StoriesController } from './story.controller';
import { StoriesService } from './story.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Story]), AuthModule],
  providers: [StoriesService],
  controllers: [StoriesController],
  exports: [StoriesService],
})
export class StoriesModule {}
