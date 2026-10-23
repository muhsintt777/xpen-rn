import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { DashboardService } from './dashboard-service';
import type { Dashboard } from './dashboard-types';

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setDashboard(await DashboardService.getCurrentUserDashboard());
    } catch {
      setError('Could not load dashboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return { dashboard, error, isLoading, refresh: load };
};
