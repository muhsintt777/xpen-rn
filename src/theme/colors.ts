const PALETTE = {
  darkTeal: '#092328',
  deepTeal: '#0D413D',
  teal: '#12544F',
  forestGreen: '#2A835F',
  white: '#FFFFFF',
  brickRed: '#B42318',
  darkAmber: '#8A5A00',
  tealBlue: '#176B87',
  slateGrey: '#526166',
  coolGrey: '#879699',
  paleGreyGreen: '#D7E1DE',
  mintWhite: '#F3F7F5',
  paleMint: '#E6F0EA',
  transparentDarkTeal: 'rgba(9, 35, 40, 0.5)',
  transparent: 'transparent',
} as const;

export const COLORS = {
  PRIMARY: PALETTE.teal,
  PRIMARY_PRESSED: PALETTE.deepTeal,
  TEXT_PRIMARY: PALETTE.darkTeal,
  TEXT_SECONDARY: PALETTE.slateGrey,
  TEXT_ON_PRIMARY: PALETTE.white,
  TEXT_DISABLED: PALETTE.coolGrey,
  BORDER: PALETTE.forestGreen,
  BORDER_SUBTLE: PALETTE.paleGreyGreen,
  BACKGROUND: PALETTE.white,
  SURFACE: PALETTE.mintWhite,
  SURFACE_TINT: PALETTE.paleMint,
  SUCCESS: PALETTE.forestGreen,
  ERROR: PALETTE.brickRed,
  WARNING: PALETTE.darkAmber,
  INFO: PALETTE.tealBlue,
  OVERLAY: PALETTE.transparentDarkTeal,
  TRANSPARENT: PALETTE.transparent,
} as const;

export type ColorName = keyof typeof COLORS;
