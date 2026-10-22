import axios from 'axios';
import { ENV } from '@/shared/config/env';
import { api } from '@/shared/services/api';

interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static readonly PREFIX = '/auth';

  static async login(email: string, password: string) {
    const res = await api.post(`${this.PREFIX}/login`, { email, password });
    return res.data?.data as Tokens;
  }

  static async refresh(refreshToken: string): Promise<Tokens> {
    const res = await axios.post(
      `${ENV.API_BASE_URL}${this.PREFIX}/refresh`,
      { refreshToken },
      {
        timeout: 15_000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data?.data as Tokens;
  }

  static async register(payload: RegisterPayload) {
    await api.post(`/user`, payload);
  }

  static async logout() {
    await api.post(`${this.PREFIX}/logout`);
  }
}
