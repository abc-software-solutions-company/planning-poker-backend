import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { RoomsModule } from './rooms/rooms.module';
import { StoriesModule } from './stories/stories.module';
import { UsersModule } from './users/users.module';
import { UserStoryRoomsModule } from './user_story_rooms/user-story-rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule,
    StoriesModule,
    RoomsModule,
    UserStoryRoomsModule,
  ],
})
export class AppModule {}
