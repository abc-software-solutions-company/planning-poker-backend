import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { PoolsModule } from 'src/database/pool/pool.module';
import { RoomsModule } from 'src/database/room/room.module';
import { StoriesModule } from 'src/database/story/story.module';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { UsersModule } from 'src/database/user/user.module';
import { UserRoomsModule } from 'src/database/userRoom/userRoom.module';

import { UserStoriesModule } from 'src/database/userStory/userStory.module';
import { SocketsModule } from 'src/socket/socket.module';
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
