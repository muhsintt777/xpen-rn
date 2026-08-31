import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { AuthService } from '@/features/auth/auth-service';
import { AuthStorage } from '@/services/auth-storage';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email address and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { accessToken, refreshToken } = await AuthService.login(
        email.trim(),
        password,
      );

      await Promise.all([
        AuthStorage.setAccessToken(accessToken),
        AuthStorage.setRefreshToken(refreshToken),
      ]);

      Keyboard.dismiss();
    } catch {
      Alert.alert(
        'Sign in failed',
        'Check your email and password, then try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    handleLogin,
    isSubmitting,
    password,
    setEmail,
    setPassword,
  };
};
