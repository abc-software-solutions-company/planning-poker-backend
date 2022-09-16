import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('req.headers.authorization: ', req.headers.authorization);
    console.log('url: ', req.baseUrl, 'body: ', req.body);
    next();
  }
}
