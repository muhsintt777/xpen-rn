import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS } from '../../theme';
import { styles } from './login-screen-styles';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <View style={styles.header}>
          <View style={styles.logoMark}>
            <View style={styles.logoStem} />
            <View style={styles.logoDot} />
          </View>
          <Text style={styles.brand}>xpen</Text>
          <Text style={styles.tagline}>Your spending, made clear.</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to your account.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              style={styles.input}
              value={email}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordField}>
              <TextInput
                autoComplete="password"
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.TEXT_SECONDARY}
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
                value={password}
              />
              <Pressable
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                hitSlop={8}
                onPress={() => setIsPasswordVisible(visible => !visible)}
              >
                <Text style={styles.visibilityText}>
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [
                styles.signInButton,
                pressed && styles.signInButtonPressed,
              ]}
            >
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>
          </View>

          <Pressable accessibilityRole="button" onPress={() => undefined}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>New to xpen? Create an account</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
