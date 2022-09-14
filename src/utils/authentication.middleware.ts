import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/database/user/index.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthenticationMiddleware');

    try {
      let user = undefined;
      user = await this.usersService.findOne(req.headers.authorization);
      if (user) next();
      else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'UNAUTHORIZED',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch {
      console.error('Err Auth');
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'UNAUTHORIZED',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
