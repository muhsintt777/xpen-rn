import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '@/components/screen-layout';
import { COLORS, TYPOGRAPHY } from '@/theme';

export const SettingsScreen = () => (
  <ScreenLayout title="Settings">
    <View style={styles.body}>
      <Text style={styles.text}>Settings coming soon.</Text>
    </View>
  </ScreenLayout>
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
