import { Request } from 'express';

export interface IRequestUser {
  id: string;
  name: string;
}
export interface IRequest extends Request {
  user: { id: string; name: string };
}
