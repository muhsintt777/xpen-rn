import { api } from '@/services/api';

interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static readonly PREFIX = '/auth';

  static async login(email: string, password: string) {
    const res = await api.post(`${this.PREFIX}/login`, { email, password });
    return res.data?.data as LoginResponse;
  }

  static async register(payload: RegisterPayload) {
    await api.post(`/user`, payload);
  }

  static async logout() {
    await api.post(`${this.PREFIX}/logout`);
  }
}
