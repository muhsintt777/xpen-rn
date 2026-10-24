const PALETTE = {
  // Brand
  darkTeal: '#092328',
  deepTeal: '#0D413D',
  teal: '#12544F',
  forestGreen: '#2A835F',

  // Dashboard backgrounds
  background: '#0B0D10',
  surface: '#14171C',
  surfaceElevated: '#1B1F25',
  surfaceMuted: '#242A33',

  // Text
  white: '#FFFFFF',
  textPrimary: '#F5F7FA',
  textSecondary: '#A8B3C7',
  textDisabled: '#737D8C',

  // Borders
  border: '#303744',
  borderSubtle: '#252B34',

  // Feedback
  success: '#24D99A',
  error: '#FF4D43',
  warning: '#FFB020',
  info: '#3488FF',

  // Category colors
  categoryHousing: '#FFAA24',
  categoryFood: '#FF4B3E',
  categoryTransport: '#3987FF',
  categoryShopping: '#9B55FF',
  categoryBills: '#20D695',
  categoryFinancial: '#00C6B4',
  categoryCommunication: '#526DFF',
  categoryInvestment: '#FF438D',
  categoryEntertainment: '#79D91C',
  categoryHealth: '#35C5E8',
  categoryEducation: '#B78BFF',
  categoryOther: '#8792A2',

  // Need / Want / Save
  need: '#FF5A78',
  want: '#FFAA24',
  save: '#20D695',

  // Overlays
  transparentDark: 'rgba(0, 0, 0, 0.55)',
  transparent: 'transparent',
} as const;

export const COLORS = {
  // Brand
  PRIMARY: PALETTE.teal,
  PRIMARY_PRESSED: PALETTE.deepTeal,
  TEXT_ON_PRIMARY: PALETTE.white,

  // Dark theme
  BACKGROUND: PALETTE.background,
  SURFACE: PALETTE.surface,
  SURFACE_ELEVATED: PALETTE.surfaceElevated,
  SURFACE_MUTED: PALETTE.surfaceMuted,

  // Text
  TEXT_PRIMARY: PALETTE.textPrimary,
  TEXT_SECONDARY: PALETTE.textSecondary,
  TEXT_DISABLED: PALETTE.textDisabled,

  // Borders
  BORDER: PALETTE.border,
  BORDER_SUBTLE: PALETTE.borderSubtle,

  // Status
  SUCCESS: PALETTE.success,
  ERROR: PALETTE.error,
  WARNING: PALETTE.warning,
  INFO: PALETTE.info,

  OVERLAY: PALETTE.transparentDark,
  TRANSPARENT: PALETTE.transparent,
} as const;

export const CATEGORY_COLORS = {
  HOUSING: PALETTE.categoryHousing,
  FOOD: PALETTE.categoryFood,
  TRANSPORT: PALETTE.categoryTransport,
  SHOPPING: PALETTE.categoryShopping,
  BILLS: PALETTE.categoryBills,
  FINANCIAL: PALETTE.categoryFinancial,
  COMMUNICATION: PALETTE.categoryCommunication,
  INVESTMENT: PALETTE.categoryInvestment,
  ENTERTAINMENT: PALETTE.categoryEntertainment,
  HEALTH: PALETTE.categoryHealth,
  EDUCATION: PALETTE.categoryEducation,
  OTHER: PALETTE.categoryOther,
} as const;

export const EXPENSE_TYPE_COLORS = {
  NEED: PALETTE.need,
  WANT: PALETTE.want,
  SAVE: PALETTE.save,
} as const;

export const CHART_COLORS = [
  PALETTE.categoryFinancial,
  PALETTE.categoryHousing,
  PALETTE.categoryFood,
  PALETTE.categoryTransport,
  PALETTE.categoryShopping,
  PALETTE.categoryBills,
  PALETTE.categoryCommunication,
  PALETTE.categoryInvestment,
  PALETTE.categoryEntertainment,
  PALETTE.categoryHealth,
  PALETTE.categoryEducation,
  PALETTE.categoryOther,
] as const;

export type ColorName = keyof typeof COLORS;
export type CategoryColorName = keyof typeof CATEGORY_COLORS;
export type ExpenseTypeColorName = keyof typeof EXPENSE_TYPE_COLORS;
