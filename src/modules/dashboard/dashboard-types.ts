import type { ExpenseType } from '@/modules/expense';

export interface DashboardCategoryTotal {
  categoryId: string;
  categoryName: string;
  total: number;
}

export interface Dashboard {
  totalExpense: number;
  totalByType: Record<ExpenseType, number>;
  totalByCategory: DashboardCategoryTotal[];
}
