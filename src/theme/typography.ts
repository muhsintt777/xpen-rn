import type { TextStyle } from 'react-native';
import { Platform } from 'react-native';

export const FONT_FAMILY = {
  SYSTEM: Platform.select({
    android: 'sans-serif',
    ios: 'System',
    default: 'sans-serif',
  }),
} as const;

export const TYPOGRAPHY = {
  DISPLAY: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 36,
  },
  HEADING: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 34,
  },
  BODY: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 24,
  },
  BODY_SMALL: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 22,
  },
  LABEL: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
  },
  BUTTON: {
    fontFamily: FONT_FAMILY.SYSTEM,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
  },
} satisfies Record<string, TextStyle>;

export type TypographyName = keyof typeof TYPOGRAPHY;
