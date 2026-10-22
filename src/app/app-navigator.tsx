import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignupScreen } from '@/modules/auth';
import { ExpenseFormScreen } from '@/modules/expense';
import { HomeScreen } from '@/modules/home';
import { SettingsScreen } from '@/modules/settings';
import type { AppStackParamList, AuthStackParamList } from './navigation-types';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { refreshAccessToken, selectAuth } from '@/modules/auth/state';
import { fetchCategories } from '@/modules/category';

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
