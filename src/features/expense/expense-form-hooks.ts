import { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { CategoryService } from '@/features/category/category-service';
import { Category } from '@/features/category/category-types';
import { ExpenseService } from './expense-service';
import { Expense, ExpenseType } from './expense-types';

export const useExpenseForm = (
  expense: Expense | undefined,
  onSaved: () => void,
) => {
  const isEditing = !!expense;
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState(expense?.amount ?? '');
  const [note, setNote] = useState(expense?.note ?? '');
  const [type, setType] = useState<ExpenseType | null>(expense?.type ?? null);
  const [categoryId, setCategoryId] = useState<string | null>(
    expense?.categoryId ?? null,
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    CategoryService.list()
      .then(setCategories)
      .catch(() =>
        Alert.alert('Error', 'Could not load categories. Please try again.'),
      );
  }, []);

  const handleSave = async () => {
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0 || !type || !categoryId) {
      Alert.alert(
        'Missing details',
        'Enter a valid amount and choose a type and category.',
      );
      return;
    }

    setIsSaving(true);
    try {
      if (expense) {
        await ExpenseService.update(expense.id, {
          amount: parsedAmount,
          categoryId,
          note: note.trim(),
          type,
        });
      } else {
        await ExpenseService.create({
          amount: parsedAmount,
          categoryId,
          date: Math.floor(Date.now() / 1000),
          note: note.trim() || undefined,
          type,
        });
      }
      Keyboard.dismiss();
      onSaved();
    } catch {
      Alert.alert('Save failed', 'Could not save the expense. Try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    amount,
    categories,
    categoryId,
    handleSave,
    isEditing,
    isSaving,
    note,
    setAmount,
    setCategoryId,
    setNote,
    setType,
    type,
  };
};
