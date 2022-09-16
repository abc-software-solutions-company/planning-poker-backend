import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './index.entity';
import { StoriesController } from './index.controller';
import { StoriesService } from './index.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Story]), AuthModule],
  providers: [StoriesService],
  controllers: [StoriesController],
  exports: [StoriesService],
})
export class StoriesModule {}
