import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { AppNavigator } from '@/app/app-navigator';
import { configureAuthApiInterceptors } from '@/modules/auth';
import { store } from '@/app/store';

configureAuthApiInterceptors();

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};
