import { FC } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { COLORS, RADII, SIZES, TYPOGRAPHY } from '@/theme';

interface PrimaryButtonProps {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  disabled = false,
  label,
  onPress,
  style,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: RADII.BUTTON,
    height: SIZES.CONTROL_HEIGHT,
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: COLORS.PRIMARY_PRESSED,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {
    ...TYPOGRAPHY.BUTTON,
    color: COLORS.TEXT_ON_PRIMARY,
  },
});
