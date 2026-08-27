import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from '../features/auth/login-screen';

export const App = () => {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
};
