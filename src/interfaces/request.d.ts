import { IUser } from './user.interface';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
