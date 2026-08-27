const RADIUS = {
  NONE: 0,
  XS: 2,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 14,
  XXL: 28,
  PILL: 999,
} as const;

export const RADII = {
  LOGO: RADIUS.XL,
  LOGO_STEM: RADIUS.XS,
  LOGO_DOT: RADIUS.SM,
  CARD: RADIUS.XXL,
  CONTROL: RADIUS.MD,
  BUTTON: RADIUS.MD,
} as const;

export type RadiusName = keyof typeof RADIUS;
export type SemanticRadiusName = keyof typeof RADII;
