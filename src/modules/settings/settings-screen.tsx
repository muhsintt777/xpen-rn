import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@/shared/theme';

export const SettingsScreen = () => (
  <View style={styles.body}>
    <Text style={styles.text}>Settings coming soon.</Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
});
