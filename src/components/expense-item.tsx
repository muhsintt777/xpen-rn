import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '@/theme';
import { Expense, ExpenseType } from '@/features/expense/expense-types';

const TYPE_COLORS: Record<ExpenseType, string> = {
  NEED: COLORS.INFO,
  WANT: COLORS.WARNING,
  SAVE: COLORS.SUCCESS,
};

const TYPE_LABELS: Record<ExpenseType, string> = {
  NEED: 'Need',
  WANT: 'Want',
  SAVE: 'Save',
};

interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  const { amount, categoryName, note, type } = expense;
  const typeColor = TYPE_COLORS[type] ?? COLORS.TEXT_SECONDARY;

  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.category}>
          {categoryName}
        </Text>
        {!!note && (
          <Text numberOfLines={2} style={styles.note}>
            {note}
          </Text>
        )}
        <View style={[styles.badge, { borderColor: typeColor }]}>
          <Text style={[styles.badgeLabel, { color: typeColor }]}>
            {TYPE_LABELS[type] ?? type}
          </Text>
        </View>
      </View>
      <Text style={styles.amount}>{Number(amount).toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.SURFACE,
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.CONTROL,
    borderWidth: 1,
    flexDirection: 'row',
    padding: SPACING.CARD_PADDING,
  },
  details: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: SPACING.CARD_PADDING,
  },
  category: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
  },
  note: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.INLINE_GAP,
  },
  badge: {
    borderRadius: RADII.PILL,
    borderWidth: 1,
    marginTop: SPACING.LABEL_BOTTOM,
    paddingHorizontal: SPACING.LABEL_BOTTOM,
  },
  badgeLabel: {
    ...TYPOGRAPHY.LABEL,
    fontSize: 12,
  },
  amount: {
    ...TYPOGRAPHY.BUTTON,
    color: COLORS.TEXT_PRIMARY,
  },
});
