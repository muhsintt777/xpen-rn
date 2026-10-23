import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { DashboardCard, useDashboard } from '@/modules/dashboard';
import { ExpenseItem } from '@/modules/expense';
import { Fab } from '@/shared/components/fab';
import { useExpenses } from '@/modules/expense';
import { styles } from './home-screen-styles';
import type { Expense } from '@/modules/expense';

interface HomeScreenProps {
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
}

const Separator = () => <View style={styles.separator} />;

export const HomeScreen = ({
  onAddExpense,
  onEditExpense,
}: HomeScreenProps) => {
  const {
    confirmDelete,
    error,
    expenses,
    isLoading,
    isRefreshing,
    loadMore,
    refresh,
  } = useExpenses();
  const dashboard = useDashboard();

  const handleRefresh = () => {
    refresh();
    dashboard.refresh();
  };

  return (
    <>
      <FlatList
        contentContainerStyle={styles.list}
        data={expenses}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <DashboardCard
            dashboard={dashboard.dashboard}
            error={dashboard.error}
            isLoading={dashboard.isLoading}
          />
        }
        ListEmptyComponent={
          isLoading || isRefreshing ? null : (
            <Text style={styles.message}>{error ?? 'No expenses yet.'}</Text>
          )
        }
        ListFooterComponent={
          isLoading ? <ActivityIndicator style={styles.loader} /> : null
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onLongPress={() => confirmDelete(item)}
            onPress={() => onEditExpense(item)}
          />
        )}
      />
      <Fab accessibilityLabel="Add expense" onPress={onAddExpense} />
    </>
  );
};
