import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { RoomsModule } from './database/room/room.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { UsersModule } from './database/user/user.module';
import { StoriesModule } from './database/story/story.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/all-exception.filter';
import { ActsModule } from './database/act/act.module';
import { ResultsModule } from './database/result/result.module';
import { EventsModule } from './socket/events.module';

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
    ResultsModule,
    ActsModule,
    EventsModule,
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
