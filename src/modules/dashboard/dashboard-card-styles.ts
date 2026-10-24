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
    marginTop: 2,
  },
  types: {
    flexDirection: 'row',
    gap: SPACING.LABEL_BOTTOM,
    marginTop: SPACING.LOGO_GAP,
  },
  typeBox: {
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.CONTROL,
    borderWidth: 1,
    flex: 1,
    minWidth: 0,
    padding: SPACING.LABEL_BOTTOM,
  },
  typeHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.LABEL_BOTTOM,
  },
  icon: {
    alignItems: 'center',
    borderRadius: RADII.PILL,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  iconText: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 18,
  },
  typeLabel: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 13,
  },
  typeAmount: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
    marginTop: SPACING.LABEL_BOTTOM,
  },
  typeShare: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  divider: {
    backgroundColor: COLORS.BORDER_SUBTLE,
    height: 1,
    marginTop: SPACING.LOGO_GAP,
  },
  chart: {
    alignItems: 'center',
    marginVertical: SPACING.LOGO_GAP,
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
    gap: 0,
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.LABEL_BOTTOM,
    minHeight: 32,
  },
  legendDot: {
    borderRadius: RADII.PILL,
    height: 10,
    width: 10,
  },
  legendName: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontWeight: '400',
  },
  legendShare: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '400',
  },
  message: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.FORM_GAP,
    textAlign: 'center',
  },
});
