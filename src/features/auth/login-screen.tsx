import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/features/auth/login-screen-styles';
import { PrimaryButton } from '@/components/primary-button';
import { FormField } from '@/components/form-field';
import { COLORS } from '@/theme';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
            Sign in to continue to your account.
          </Text>

          <View style={styles.form}>
            <FormField
              label="Email address"
              onChangeText={setEmail}
              placeholder="you@example.com"
              type="text"
              value={email}
            />

            <FormField
              label="Password"
              onChangeText={setPassword}
              placeholder="Enter your password"
              type="secret"
              value={password}
            />

            <PrimaryButton
              label="Sign in"
              onPress={() => undefined}
              style={styles.signInButton}
            />
          </View>
        </View>

        <Text style={styles.footer}>New to xpen? Create an account</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
