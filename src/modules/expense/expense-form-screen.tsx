import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField } from '@/shared/components/form-field';
import { OptionChips } from '@/shared/components/option-chips';
import { PrimaryButton } from '@/shared/components/primary-button';
import { useExpenseForm } from './expense-form-hooks';
import { styles } from './expense-form-screen-styles';
import { Expense, ExpenseType } from './expense-types';

interface ExpenseFormScreenProps {
  expense?: Expense;
  onSaved: () => void;
}

const TYPE_OPTIONS: { label: string; value: ExpenseType }[] = [
  { label: 'Need', value: 'NEED' },
  { label: 'Want', value: 'WANT' },
  { label: 'Save', value: 'SAVE' },
];

export const ExpenseFormScreen = ({
  expense,
  onSaved,
}: ExpenseFormScreenProps) => {
  const form = useExpenseForm(expense, onSaved);

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
          <Text style={styles.title}>
            {form.isEditing ? 'Edit expense' : 'Add expense'}
          </Text>
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
          {form.isLoadingCategories && <ActivityIndicator />}
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
