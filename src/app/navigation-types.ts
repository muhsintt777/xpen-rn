import type { Expense } from '@/modules/expense';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  ExpenseForm: { expense?: Expense } | undefined;
  Settings: undefined;
};
