import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/database/user/index.service';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // let user = undefined;
    // if (user) user = await this.usersService.findOne(req.headers.authorization);
    // console.log('🚀 ~ file: logger.middleware.ts ~ line 11 ~ Middleware ~ use ~ user', user);
    // console.log('body: ', req.body);
    // if (user) next();
    // else return res.status(401).json('Unauthorized');
  }
}
