import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { APP_FILTER } from '@nestjs/core';
import { SocketsModule } from './socket/socket.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { UsersModule } from './user/user.module';
import { StoriesModule } from './story/story.module';
import { RoomsModule } from './room/room.module';
import { UserRoomsModule } from './userRoom/userRoom.module';
import { UserStoriesModule } from './userStory/userStory.module';
import { PoolsModule } from './pool/pool.module';

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
    UserRoomsModule,
    UserStoriesModule,
    AuthModule,
    PoolsModule,
    SocketsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
