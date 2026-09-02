import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/features/auth/login-screen';
import { HomeScreen } from '@/features/home/home-screem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { refreshAccessToken, selectAuth } from '@/features/auth/auth-slice';

type AuthStackParamList = {
  Login: undefined;
};

type AppStackParamList = {
  Home: undefined;
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
