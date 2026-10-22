import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ScreenLayout } from '@/app/screen-layout';
import { ExpenseItem } from '@/modules/expense';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AppStackParamList } from '@/app/navigation-types';
import { Fab } from '@/shared/components/fab';
import { useExpenses } from '@/modules/expense';
import { styles } from './home-screen-styles';

const Separator = () => <View style={styles.separator} />;

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'Home'>>();
  const {
    confirmDelete,
    error,
    expenses,
    isLoading,
    isRefreshing,
    loadMore,
    refresh,
  } = useExpenses();

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
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onLongPress={() => confirmDelete(item)}
            onPress={() =>
              navigation.navigate('ExpenseForm', { expense: item })
            }
          />
        )}
      />
      <Fab
        accessibilityLabel="Add expense"
        onPress={() => navigation.navigate('ExpenseForm')}
      />
    </ScreenLayout>
  );
};
