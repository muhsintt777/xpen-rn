import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { selectAuth, login } from '@/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoggingIn } = useAppSelector(selectAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email address and password.');
      return;
    }

    try {
      await dispatch(
        login({
          email: email.trim(),
          password,
        }),
      ).unwrap();

      Keyboard.dismiss();
    } catch {
      Alert.alert(
        'Sign in failed',
        'Check your email and password, then try again.',
      );
    }
  };

  return {
    email,
    handleLogin,
    isLoggingIn,
    password,
    setEmail,
    setPassword,
  };
};
