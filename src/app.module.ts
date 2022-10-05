import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { PoolsModule } from './database/pool/pool.module';
import { RoomsModule } from './database/room/room.module';
import { StoriesModule } from './database/story/story.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { UsersModule } from './database/user/user.module';
import { UserRoomsModule } from './database/userRoom/userRoom.module';
import { UserStoriesModule } from './database/userStory/userStory.module';
import { SocketsModule } from './socket/socket.module';
import { ApiKeyMiddleware } from './utils/api-key.middleware';
import { HttpExceptionFilter } from './utils/http-exception.filter';

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
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 100,
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
