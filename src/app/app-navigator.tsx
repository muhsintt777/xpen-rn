import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AuthLoginRoute,
  AuthSignupRoute,
  ExpenseFormRoute,
  HomeRoute,
  SettingsRoute,
} from './screen-routes';
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
          <AppStack.Screen name="Home" component={HomeRoute} />
          <AppStack.Screen name="Settings" component={SettingsRoute} />
          <AppStack.Screen name="ExpenseForm" component={ExpenseFormRoute} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <AuthStack.Screen name="Login" component={AuthLoginRoute} />
          <AuthStack.Screen name="Signup" component={AuthSignupRoute} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
