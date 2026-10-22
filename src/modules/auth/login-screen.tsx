import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/modules/auth/login-screen-styles';
import { PrimaryButton } from '@/shared/components/primary-button';
import { FormField } from '@/shared/components/form-field';
import { useLogin } from '@/modules/auth/auth-hooks';
import { COLORS } from '@/shared/theme';

interface LoginScreenProps {
  onSignupPress: () => void;
}

export const LoginScreen = ({ onSignupPress }: LoginScreenProps) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { email, handleLogin, isLoggingIn, password, setEmail, setPassword } =
    useLogin();

  useEffect(() => {
    const keyboardShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardShowSubscription.remove();
      keyboardHideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <View
          style={[styles.header, isKeyboardVisible && styles.headerCompact]}
        >
          <View
            style={[
              styles.brandRow,
              isKeyboardVisible && styles.brandRowCompact,
            ]}
          >
            <View
              style={[
                styles.logoMark,
                isKeyboardVisible && styles.logoMarkCompact,
              ]}
            >
              <View style={styles.logoStem} />
              <View style={styles.logoDot} />
            </View>
            <Text style={styles.brand}>Xpen</Text>
          </View>
          <Text style={styles.tagline}>Your spending, made clear.</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Login in to continue to your account.
          </Text>

          <View style={styles.form}>
            <FormField
              disabled={isLoggingIn}
              label="Email address"
              onChangeText={setEmail}
              placeholder="you@example.com"
              type="text"
              value={email}
            />

            <FormField
              disabled={isLoggingIn}
              label="Password"
              onChangeText={setPassword}
              placeholder="Enter your password"
              type="secret"
              value={password}
            />

            <PrimaryButton
              disabled={isLoggingIn}
              label={isLoggingIn ? 'Login...' : 'Login'}
              onPress={handleLogin}
              style={styles.signInButton}
            />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onSignupPress}
          style={styles.footer}
        >
          <Text style={styles.footer}>
            New to xpen?{' '}
            <Text style={styles.footerAction}>Create an account</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
