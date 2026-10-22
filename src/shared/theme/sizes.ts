export const SIZES = {
  LOGO: 48,
  LOGO_STEM_HEIGHT: 19,
  LOGO_STEM_WIDTH: 4,
  LOGO_DOT: 8,
  LOGO_DOT_OFFSET: -3,
  CONTROL_HEIGHT: 52,
  BORDER_WIDTH: 1,
} as const;

export type SizeName = keyof typeof SIZES;
