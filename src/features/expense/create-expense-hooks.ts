import { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { CategoryService } from '@/features/category/category-service';
import { Category } from '@/features/category/category-types';
import { ExpenseService } from './expense-service';
import { ExpenseType } from './expense-types';

export const useCreateExpense = (onCreated: () => void) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<ExpenseType | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
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
      await ExpenseService.create({
        amount: parsedAmount,
        categoryId,
        date: Math.floor(Date.now() / 1000),
        note: note.trim() || undefined,
        type,
      });
      Keyboard.dismiss();
      onCreated();
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
    isSaving,
    note,
    setAmount,
    setCategoryId,
    setNote,
    setType,
    type,
  };
};
