import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/app/app-navigator';

export const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};
