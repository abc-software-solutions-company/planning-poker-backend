import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/database/user/index.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let user = undefined;
    user = await this.usersService.findOne(req.headers.authorization);
    console.log('🚀 ~ file: authentication.middleware.ts ~ line 12 ~ AuthenticationMiddleware ~ use ~ user', user);
    if (user) next();
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'This is a custom message',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
