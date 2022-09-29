import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { PoolsModule } from 'src/pool/pool.module';
import { RoomsModule } from 'src/room/room.module';
import { SocketsModule } from 'src/socket/socket.module';
import { StoriesModule } from 'src/story/story.module';
import { UsersModule } from 'src/user/user.module';
import { UserRoomsModule } from 'src/userRoom/userRoom.module';
import { UserStoriesModule } from 'src/userStory/userStory.module';
import { DataSource } from 'typeorm';

export function testHelper() {
  const testingModuleBuilder = Test.createTestingModule({
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
  });
  return testingModuleBuilder.compile();
}
