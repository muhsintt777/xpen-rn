import { FC, ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '@/shared/components/app-bar';
import { SideDrawer } from '@/shared/components/side-drawer';
import { COLORS } from '@/shared/theme';
import { DrawerContent } from './drawer-content';

interface ScreenLayoutProps {
  children: ReactNode;
  title: string;
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({ children, title }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const close = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <AppBar title={title} onMenuPress={() => setIsDrawerOpen(true)} />
        {children}
      </SafeAreaView>
      <SideDrawer isOpen={isDrawerOpen} onClose={close}>
        <DrawerContent onClose={close} />
      </SideDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
