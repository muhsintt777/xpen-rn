import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ExpenseService } from './expense-service';
import { Expense } from './expense-types';

const PAGE_SIZE = 10;

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursorRef = useRef('');
  const hasNextPageRef = useRef(true);
  const inFlightRef = useRef(false);

  const load = useCallback(async (reset: boolean) => {
    if (inFlightRef.current || (!reset && !hasNextPageRef.current)) {
      return;
    }
    inFlightRef.current = true;
    setError(null);
    reset ? setIsRefreshing(true) : setIsLoading(true);

    try {
      const page = await ExpenseService.getCurrentUserExpenses(
        PAGE_SIZE,
        reset ? undefined : cursorRef.current,
      );
      cursorRef.current = page.pagination.nextCursor;
      hasNextPageRef.current = page.pagination.hasNextPage;
      setExpenses((prev) => (reset ? page.items : [...prev, ...page.items]));
    } catch {
      setError('Could not load expenses. Please try again.');
    } finally {
      inFlightRef.current = false;
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Refetch on every focus so a newly created expense appears on return.
  useFocusEffect(
    useCallback(() => {
      load(true);
    }, [load]),
  );

  return {
    error,
    expenses,
    isLoading,
    isRefreshing,
    loadMore: () => load(false),
    refresh: () => load(true),
  };
};
