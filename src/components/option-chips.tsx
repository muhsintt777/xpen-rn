import { StyleSheet, Pressable, Text, View } from 'react-native';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '@/theme';

interface Option<T extends string> {
  label: string;
  value: T;
}

interface OptionChipsProps<T extends string> {
  disabled?: boolean;
  label: string;
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T | null;
}

export const OptionChips = <T extends string>({
  disabled = false,
  label,
  onChange,
  options,
  value,
}: OptionChipsProps<T>) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            disabled={disabled}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <Text
              style={[styles.chipLabel, selected && styles.chipLabelSelected]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.FIELD_GAP,
  },
  label: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LABEL_BOTTOM,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.LABEL_BOTTOM,
  },
  chip: {
    backgroundColor: COLORS.SURFACE,
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.PILL,
    borderWidth: 1,
    paddingHorizontal: SPACING.CARD_PADDING,
    paddingVertical: SPACING.LABEL_BOTTOM,
  },
  chipSelected: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  chipLabel: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
  },
  chipLabelSelected: {
    color: COLORS.TEXT_ON_PRIMARY,
  },
});
