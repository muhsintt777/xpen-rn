import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ScreenLayout } from '@/components/screen-layout';
import { ExpenseItem } from '@/components/expense-item';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AppStackParamList } from '@/app/app-navigator';
import { Fab } from '@/components/fab';
import { useExpenses } from '@/features/expense/expense-hooks';
import { styles } from './home-screen-styles';

const Separator = () => <View style={styles.separator} />;

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'Home'>>();
  const { error, expenses, isLoading, isRefreshing, loadMore, refresh } =
    useExpenses();

  return (
    <ScreenLayout title="Expenses">
      <FlatList
        contentContainerStyle={styles.list}
        data={expenses}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => String(item.id)}
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
        onRefresh={refresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
      />
      <Fab
        accessibilityLabel="Add expense"
        onPress={() => navigation.navigate('CreateExpense')}
      />
    </ScreenLayout>
  );
};
