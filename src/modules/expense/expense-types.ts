export type ExpenseType = 'NEED' | 'WANT' | 'SAVE';

export interface Expense {
  id: string | number;
  categoryId: string;
  categoryName: string;
  note?: string | null;
  type: ExpenseType;
  amount: string;
  date: string;
}

export interface ExpensePagination {
  limit: number;
  nextCursor: string;
  hasNextPage: boolean;
}

export interface ExpensePage {
  items: Expense[];
  pagination: ExpensePagination;
}

export interface UpdateExpensePayload {
  amount: number;
  categoryId: string;
  note: string;
  type: ExpenseType;
}

export interface CreateExpensePayload {
  amount: number;
  categoryId: string;
  date: number;
  note?: string;
  type: ExpenseType;
}
