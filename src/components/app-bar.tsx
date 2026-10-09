import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

interface AppBarProps {
  title: string;
  onMenuPress: () => void;
}

export const AppBar: FC<AppBarProps> = ({ title, onMenuPress }) => (
  <View style={styles.bar}>
    <Pressable
      accessibilityLabel="Open menu"
      accessibilityRole="button"
      hitSlop={8}
      onPress={onMenuPress}
      style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
    >
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </Pressable>
    <Text accessibilityRole="header" numberOfLines={1} style={styles.title}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.BORDER_SUBTLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: SPACING.CARD_PADDING,
  },
  menuButton: {
    borderRadius: 20,
    gap: 5,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 9,
    width: 40,
  },
  pressed: {
    backgroundColor: COLORS.SURFACE_TINT,
  },
  line: {
    backgroundColor: COLORS.TEXT_PRIMARY,
    borderRadius: 1,
    height: 2,
    width: '100%',
  },
  title: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontSize: 20,
    lineHeight: 26,
    marginLeft: SPACING.CARD_PADDING,
  },
});
