import { api } from '@/shared/services/api';
import type { Dashboard } from './dashboard-types';

export class DashboardService {
  private static readonly PREFIX = '/dashboard';

  static async getCurrentUserDashboard() {
    const res = await api.get(`${this.PREFIX}/currentuser`);
    return res.data?.data as Dashboard;
  }
}
