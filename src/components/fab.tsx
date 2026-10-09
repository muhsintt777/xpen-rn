import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING } from '@/theme';

interface FabProps {
  accessibilityLabel: string;
  onPress: () => void;
}

export const Fab: FC<FabProps> = ({ accessibilityLabel, onPress }) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
  >
    <Text style={styles.icon}>+</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 28,
    bottom: SPACING.FAB_BOTTOM,
    elevation: 6,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: SPACING.SCREEN_HORIZONTAL,
    shadowColor: COLORS.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 56,
  },
  pressed: {
    backgroundColor: COLORS.PRIMARY_PRESSED,
  },
  icon: {
    color: COLORS.TEXT_ON_PRIMARY,
    fontSize: 28,
    lineHeight: 32,
  },
});
