// import { AppNavigator } from '@/app/app-navigator';
import { HomeScreen } from '@/features/home/home-screem';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
  // return <AppNavigator />;
};
