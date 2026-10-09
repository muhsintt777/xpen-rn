import { api } from '@/services/api';
import { ExpensePage } from './expense-types';

export class ExpenseService {
  private static readonly PREFIX = '/expense';

  static async getCurrentUserExpenses(limit: number, cursor?: string) {
    const res = await api.get(`${this.PREFIX}/currentuser`, {
      params: { limit, cursor: cursor || undefined },
    });
    return res.data?.data as ExpensePage;
  }
}
