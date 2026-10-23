import { StyleSheet } from 'react-native';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '@/shared/theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.CARD_PADDING,
    backgroundColor: COLORS.SURFACE,
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.CARD,
    borderWidth: 1,
    padding: SPACING.CARD_PADDING + 4,
  },
  caption: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase',
  },
  total: {
    ...TYPOGRAPHY.DISPLAY,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.INLINE_GAP,
  },
  types: {
    flexDirection: 'row',
    gap: SPACING.LABEL_BOTTOM,
    marginTop: SPACING.CARD_PADDING,
  },
  typeBox: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.CONTROL,
    borderWidth: 1,
    flex: 1,
    padding: SPACING.LABEL_BOTTOM + 4,
  },
  typeHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.LABEL_BOTTOM - 2,
  },
  dot: {
    borderRadius: RADII.PILL,
    height: 8,
    width: 8,
  },
  typeLabel: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_SECONDARY,
  },
  typeAmount: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
    marginTop: SPACING.INLINE_GAP,
  },
  chart: {
    alignItems: 'center',
    marginVertical: SPACING.FORM_GAP,
  },
  chartCaption: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_SECONDARY,
  },
  chartTotal: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
  legend: {
    gap: SPACING.LOGO_GAP,
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.LOGO_GAP,
  },
  legendDot: {
    borderRadius: RADII.PILL,
    height: 10,
    width: 10,
  },
  legendName: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  message: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.FORM_GAP,
    textAlign: 'center',
  },
});
