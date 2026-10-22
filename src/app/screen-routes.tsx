import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LoginScreen, SignupScreen } from '@/modules/auth';
import { ExpenseFormScreen, type Expense } from '@/modules/expense';
import { HomeScreen } from '@/modules/home';
import { SettingsScreen } from '@/modules/settings';
import { ScreenLayout } from './screen-layout';
import type { AppStackParamList, AuthStackParamList } from './navigation-types';

export const AuthLoginRoute = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, 'Login'>>();
  return <LoginScreen onSignupPress={() => navigation.navigate('Signup')} />;
};

export const AuthSignupRoute = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, 'Signup'>>();
  return (
    <SignupScreen
      onLoginPress={() => navigation.navigate('Login')}
      onSignupSuccess={() => navigation.replace('Login')}
    />
  );
};

export const HomeRoute = () => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'Home'>>();
  return (
    <ScreenLayout title="Expenses">
      <HomeScreen
        onAddExpense={() => navigation.navigate('ExpenseForm')}
        onEditExpense={(expense: Expense) =>
          navigation.navigate('ExpenseForm', { expense })
        }
      />
    </ScreenLayout>
  );
};

export const SettingsRoute = () => (
  <ScreenLayout title="Settings">
    <SettingsScreen />
  </ScreenLayout>
);

export const ExpenseFormRoute = () => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'ExpenseForm'>>();
  const { params } = useRoute<RouteProp<AppStackParamList, 'ExpenseForm'>>();
  return (
    <ExpenseFormScreen
      expense={params?.expense}
      onSaved={() => navigation.goBack()}
    />
  );
};
