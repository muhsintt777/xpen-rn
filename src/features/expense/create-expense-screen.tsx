import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FormField } from '@/components/form-field';
import { OptionChips } from '@/components/option-chips';
import { PrimaryButton } from '@/components/primary-button';
import { useCreateExpense } from './create-expense-hooks';
import { styles } from './create-expense-screen-styles';
import { ExpenseType } from './expense-types';

const TYPE_OPTIONS: { label: string; value: ExpenseType }[] = [
  { label: 'Need', value: 'NEED' },
  { label: 'Want', value: 'WANT' },
  { label: 'Save', value: 'SAVE' },
];

export const CreateExpenseScreen = () => {
  const navigation = useNavigation();
  const form = useCreateExpense(() => navigation.goBack());

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add expense</Text>
          <FormField
            disabled={form.isSaving}
            label="Amount"
            onChangeText={form.setAmount}
            placeholder="0.00"
            type="decimal"
            value={form.amount}
          />
          <OptionChips
            disabled={form.isSaving}
            label="Type"
            onChange={form.setType}
            options={TYPE_OPTIONS}
            value={form.type}
          />
          <OptionChips
            disabled={form.isSaving}
            label="Category"
            onChange={form.setCategoryId}
            options={form.categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
            value={form.categoryId}
          />
          <FormField
            disabled={form.isSaving}
            label="Note (optional)"
            onChangeText={form.setNote}
            placeholder="What was this for?"
            type="text"
            value={form.note}
          />
          <PrimaryButton
            disabled={form.isSaving}
            label={form.isSaving ? 'Saving...' : 'Save'}
            onPress={form.handleSave}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
