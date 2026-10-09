import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: SPACING.SCREEN_HORIZONTAL,
  },
  title: {
    ...TYPOGRAPHY.HEADING,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.FORM_GAP,
  },
});
