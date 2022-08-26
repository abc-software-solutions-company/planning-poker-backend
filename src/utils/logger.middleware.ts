import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('header: ', req.headers.cookie);
    console.log('body: ', req.body);
    console.log('params: ', req.params);
    next();
  }
}
