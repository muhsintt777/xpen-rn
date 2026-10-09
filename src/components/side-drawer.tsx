import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/theme';

const DRAWER_WIDTH_RATIO = 0.9;
const ANIMATION_MS = 250;

interface SideDrawerProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: FC<SideDrawerProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  const { width } = useWindowDimensions();
  const drawerWidth = width * DRAWER_WIDTH_RATIO;
  const progress = useRef(new Animated.Value(0)).current;
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
    Animated.timing(progress, {
      duration: ANIMATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: isOpen ? 1 : 0,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isOpen) {
        setIsMounted(false);
      }
    });
  }, [isOpen, progress]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Animated.View style={[styles.backdrop, { opacity: progress }]}>
        <Pressable
          accessibilityLabel="Close menu"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-drawerWidth, 0],
                }),
              },
            ],
            width: drawerWidth,
          },
        ]}
      >
        <SafeAreaView style={styles.content}>{children}</SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.OVERLAY,
  },
  drawer: {
    backgroundColor: COLORS.BACKGROUND,
    bottom: 0,
    elevation: 16,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
  },
});
