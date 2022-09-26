import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  schema: process.env.DATABASE_SCHEMA,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
}));
