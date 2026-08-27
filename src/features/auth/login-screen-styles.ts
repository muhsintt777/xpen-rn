import { StyleSheet } from 'react-native';
import { COLORS, RADII, SIZES, SPACING, TYPOGRAPHY } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: SPACING.HEADER_TOP,
    paddingBottom: SPACING.HEADER_BOTTOM,
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
    flex: 1,
    paddingHorizontal: SPACING.SCREEN_HORIZONTAL,
    paddingTop: SPACING.CARD_PADDING,
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
  signInButton: {
    marginTop: SPACING.BUTTON_TOP,
  },
  footer: {
    backgroundColor: COLORS.BACKGROUND,
    color: COLORS.TEXT_SECONDARY,
    ...TYPOGRAPHY.LABEL,
    paddingBottom: SPACING.FOOTER_BOTTOM,
    textAlign: 'center',
  },
});
