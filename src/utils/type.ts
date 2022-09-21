import { Request } from 'express';

export interface IRequestUser {
  id: string;
  name: string;
}
export interface IRequest extends Request {
  user: { id: string; name: string };
}

export interface IToastItem {
  type?: 'info' | 'danger' | 'success' | 'warning';
  title?: string;
  content?: string;
  icon?: string;
  lifeTime?: number;
}
