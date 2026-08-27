import { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, RADII, SIZES, SPACING, TYPOGRAPHY } from '@/theme';

type FormFieldType = 'text' | 'secret' | 'number';

const inputTypeOptions: Record<
  FormFieldType,
  { keyboardType: KeyboardTypeOptions }
> = {
  text: { keyboardType: 'default' },
  secret: { keyboardType: 'default' },
  number: { keyboardType: 'number-pad' },
};

interface FormFieldProps {
  disabled?: boolean;
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  type: FormFieldType;
  value: string;
}

export const FormField: FC<FormFieldProps> = ({
  disabled = false,
  label,
  onChangeText,
  placeholder,
  type,
  value,
}) => {
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const isSecret = type === 'secret';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <TextInput
          editable={!disabled}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.TEXT_SECONDARY}
          style={styles.input}
          {...inputTypeOptions[type]}
          secureTextEntry={isSecret && !isSecretVisible}
          value={value}
        />
        {isSecret && (
          <Pressable
            accessibilityLabel={isSecretVisible ? 'Hide Secret' : 'Show Secret'}
            disabled={disabled}
            hitSlop={8}
            onPress={() => setIsSecretVisible((visible) => !visible)}
          >
            <Text style={styles.visibilityText}>
              {isSecretVisible ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.FIELD_GAP,
  },
  label: {
    color: COLORS.TEXT_PRIMARY,
    ...TYPOGRAPHY.LABEL,
    marginBottom: SPACING.LABEL_BOTTOM,
  },
  field: {
    alignItems: 'center',
    backgroundColor: COLORS.SURFACE,
    borderColor: COLORS.BORDER_SUBTLE,
    borderRadius: RADII.CONTROL,
    borderWidth: SIZES.BORDER_WIDTH,
    flexDirection: 'row',
    height: SIZES.CONTROL_HEIGHT,
    paddingRight: SPACING.CONTROL_PADDING,
  },
  input: {
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    ...TYPOGRAPHY.BODY,
    height: '100%',
    paddingHorizontal: SPACING.CONTROL_PADDING,
  },
  visibilityText: {
    color: COLORS.PRIMARY,
    ...TYPOGRAPHY.LABEL,
  },
});
