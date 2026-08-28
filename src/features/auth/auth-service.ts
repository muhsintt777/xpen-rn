import { api } from '@/services/api';

export class AuthService {
  private static readonly PREFIX = '/auth';

  static async login(email: string, password: string) {
    const res = await api.post(`${this.PREFIX}/login`, { email, password });
    return res.data?.data;
  }
}
