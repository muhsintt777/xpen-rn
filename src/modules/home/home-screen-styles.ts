import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingBottom: SPACING.FAB_BOTTOM + 56,
    paddingHorizontal: SPACING.SCREEN_HORIZONTAL,
  },
  separator: {
    height: SPACING.LABEL_BOTTOM,
  },
  message: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.FORM_GAP,
    textAlign: 'center',
  },
  loader: {
    marginVertical: SPACING.CARD_PADDING,
  },
});
