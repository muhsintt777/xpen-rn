import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/features/auth/login-screen';
import { SignupScreen } from '@/features/auth/signup-screen';
import { ExpenseFormScreen } from '@/features/expense/expense-form-screen';
import type { Expense } from '@/features/expense/expense-types';
import { HomeScreen } from '@/features/home/home-screen';
import { SettingsScreen } from '@/features/settings/settings-screen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { refreshAccessToken, selectAuth } from '@/features/auth/auth-slice';
import { fetchCategories } from '@/features/category/category-slice';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  ExpenseForm: { expense?: Expense } | undefined;
  Settings: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Settings" component={SettingsScreen} />
          <AppStack.Screen name="ExpenseForm" component={ExpenseFormScreen} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
