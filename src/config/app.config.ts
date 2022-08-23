import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
}));
