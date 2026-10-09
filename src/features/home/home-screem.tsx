import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseItem } from '@/components/expense-item';
import { PrimaryButton } from '@/components/primary-button';
import { useExpenses } from '@/features/expense/expense-hooks';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '../auth/auth-slice';
import { styles } from './home-screen-styles';

const Separator = () => <View style={styles.separator} />;

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { error, expenses, isLoading, isRefreshing, loadMore, refresh } =
    useExpenses();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <PrimaryButton
          label="Logout"
          onPress={() => dispatch(logout())}
          style={styles.logoutButton}
        />
      </View>
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
    </SafeAreaView>
  );
};
