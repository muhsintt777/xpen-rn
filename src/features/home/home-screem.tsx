import { PrimaryButton } from '@/components/primary-button';
import { useAppDispatch } from '@/store/hooks';
import { Text, View } from 'react-native';
import { logout } from '../auth/auth-slice';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <PrimaryButton
        label="logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
};
