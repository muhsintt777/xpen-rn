import { api } from '@/shared/services/api';
import { User } from './user-types';

export class UserService {
  private static readonly PREFIX = '/user';

  static async getCurrentUser() {
    const res = await api.get(`${this.PREFIX}/currentuser`);
    return res.data?.data as User;
  }
}
