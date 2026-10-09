import { api } from '@/services/api';
import { CreateExpensePayload, ExpensePage } from './expense-types';

export class ExpenseService {
  private static readonly PREFIX = '/expense';

  static async getCurrentUserExpenses(limit: number, cursor?: string) {
    const res = await api.get(`${this.PREFIX}/currentuser`, {
      params: { limit, cursor: cursor || undefined },
    });
    return res.data?.data as ExpensePage;
  }

  static async create(payload: CreateExpensePayload) {
    await api.post(this.PREFIX, payload);
  }
}
