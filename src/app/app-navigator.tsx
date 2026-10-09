import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/features/auth/login-screen';
import { CreateExpenseScreen } from '@/features/expense/create-expense-screen';
import { HomeScreen } from '@/features/home/home-screen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { refreshAccessToken, selectAuth } from '@/features/auth/auth-slice';

type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  CreateExpense: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

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
          <AppStack.Screen
            name="CreateExpense"
            component={CreateExpenseScreen}
          />
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
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
