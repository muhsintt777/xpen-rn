import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField } from '@/shared/components/form-field';
import { PrimaryButton } from '@/shared/components/primary-button';
import type { AuthStackParamList } from '@/app/navigation-types';
import { AuthService } from '@/modules/auth/auth-service';
import { COLORS, RADII, SIZES, SPACING, TYPOGRAPHY } from '@/shared/theme';

export const SignupScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, 'Signup'>>();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    const name = fullname.trim();
    const normalizedEmail = email.trim();
    if (!name || !normalizedEmail || !password) {
      Alert.alert(
        'Missing details',
        'Enter your name, email address, and password.',
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await AuthService.register({
        fullname: name,
        email: normalizedEmail,
        password,
      });
      Keyboard.dismiss();
      Alert.alert(
        'Account created',
        'You can now sign in with your new account.',
      );
      navigation.replace('Login');
    } catch (error) {
      const isRateLimited =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.status === 429;
      const message = isRateLimited
        ? 'Too many attempts. Please wait a few minutes and try again.'
        : axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ??
          'Could not create your account. Please try again.'
        : 'Could not create your account. Please try again.';
      Alert.alert('Sign up failed', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoMark}>
              <View style={styles.logoStem} />
              <View style={styles.logoDot} />
            </View>
            <Text style={styles.brand}>Xpen</Text>
            <Text style={styles.tagline}>Your spending, made clear.</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Sign up to start managing your spending.
            </Text>

            <View style={styles.form}>
              <FormField
                disabled={isSubmitting}
                label="Full name"
                onChangeText={setFullname}
                placeholder="Your name"
                type="text"
                value={fullname}
              />
              <FormField
                disabled={isSubmitting}
                label="Email address"
                onChangeText={setEmail}
                placeholder="you@example.com"
                type="text"
                value={email}
              />
              <FormField
                disabled={isSubmitting}
                label="Password"
                onChangeText={setPassword}
                placeholder="Create a password"
                type="secret"
                value={password}
              />
              <PrimaryButton
                disabled={isSubmitting}
                label={isSubmitting ? 'Creating account...' : 'Sign up'}
                onPress={handleSignup}
                style={styles.submitButton}
              />
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={() => navigation.navigate('Login')}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerAction}>Log in</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingBottom: SPACING.HEADER_BOTTOM,
    paddingTop: SPACING.HEADER_TOP,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: COLORS.SURFACE,
    borderRadius: RADII.LOGO,
    height: SIZES.LOGO,
    justifyContent: 'center',
    marginBottom: SPACING.LOGO_GAP,
    width: SIZES.LOGO,
  },
  logoStem: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: RADII.LOGO_STEM,
    height: SIZES.LOGO_STEM_HEIGHT,
    transform: [{ rotate: '25deg' }],
    width: SIZES.LOGO_STEM_WIDTH,
  },
  logoDot: {
    backgroundColor: COLORS.BORDER,
    borderRadius: RADII.LOGO_DOT,
    height: SIZES.LOGO_DOT,
    marginTop: SIZES.LOGO_DOT_OFFSET,
    width: SIZES.LOGO_DOT,
  },
  brand: {
    ...TYPOGRAPHY.DISPLAY,
    color: COLORS.TEXT_ON_PRIMARY,
  },
  tagline: {
    color: COLORS.SURFACE,
    ...TYPOGRAPHY.BODY_SMALL,
    marginTop: SPACING.INLINE_GAP,
  },
  content: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: RADII.CARD,
    borderTopRightRadius: RADII.CARD,
    flexGrow: 1,
    paddingHorizontal: SPACING.SCREEN_HORIZONTAL,
    paddingTop: SPACING.FORM_GAP,
  },
  title: {
    ...TYPOGRAPHY.HEADING,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    color: COLORS.TEXT_SECONDARY,
    ...TYPOGRAPHY.BODY_SMALL,
    marginTop: SPACING.INLINE_GAP,
  },
  form: {
    marginTop: SPACING.FORM_GAP,
  },
  submitButton: {
    marginTop: SPACING.LABEL_BOTTOM,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: SPACING.FOOTER_BOTTOM,
    paddingTop: SPACING.LABEL_BOTTOM,
  },
  footerText: {
    color: COLORS.TEXT_SECONDARY,
    ...TYPOGRAPHY.LABEL,
    textAlign: 'center',
  },
  footerAction: {
    color: COLORS.PRIMARY,
  },
});
