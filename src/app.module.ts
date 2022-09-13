import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { RoomsModule } from './database/room/index.module';
import { UsersModule } from './database/user/index.module';
import { StoriesModule } from './database/story/index.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/all-exception.filter';
import { SocketsModule } from './socket/index.module';
import { UserRoomsModule } from './database/userRoom/index.module';
import { UserStoriesModule } from './database/userStory/index.module';
import { PoolsModule } from './database/pool/index.module';
import { Middleware } from './utils/logger.middleware';

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
    PoolsModule,
    SocketsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('*');
  }
}
