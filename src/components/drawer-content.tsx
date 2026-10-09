import { FC, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AppStackParamList } from '@/app/app-navigator';
import {
  fetchCurrentUser,
  logout,
  selectAuth,
} from '@/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { version } from '../../package.json';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '@/theme';

type DrawerRoute = 'Home' | 'Settings';

const ROUTES: { label: string; name: DrawerRoute }[] = [
  { label: 'Home', name: 'Home' },
  { label: 'Settings', name: 'Settings' },
];

interface DrawerContentProps {
  onClose: () => void;
}

export const DrawerContent: FC<DrawerContentProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const { name: activeRoute } = useRoute();

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  const handleNavigate = (name: DrawerRoute) => {
    onClose();
    if (name !== activeRoute) {
      navigation.navigate(name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.fullname.charAt(0).toUpperCase() ?? ''}
          </Text>
        </View>
        <View style={styles.profileText}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.fullname ?? ' '}
          </Text>
          <Text numberOfLines={1} style={styles.email}>
            {user?.email ?? ' '}
          </Text>
        </View>
      </View>

      <View style={styles.routes}>
        {ROUTES.map(({ label, name }) => {
          const isActive = name === activeRoute;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              key={name}
              onPress={() => handleNavigate(name)}
              style={[styles.item, isActive && styles.itemActive]}
            >
              <Text
                style={[styles.itemText, isActive && styles.itemTextActive]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.version}>Version {version}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => dispatch(logout())}
        style={({ pressed }) => [styles.logout, pressed && styles.itemActive]}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const AVATAR_SIZE = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.CARD_PADDING,
  },
  profile: {
    alignItems: 'center',
    borderBottomColor: COLORS.BORDER_SUBTLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: SPACING.CARD_PADDING,
    paddingBottom: SPACING.CARD_PADDING,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: AVATAR_SIZE / 2,
    height: AVATAR_SIZE,
    justifyContent: 'center',
    width: AVATAR_SIZE,
  },
  avatarText: {
    ...TYPOGRAPHY.HEADING,
    color: COLORS.TEXT_ON_PRIMARY,
  },
  profileText: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.BUTTON,
    color: COLORS.TEXT_PRIMARY,
  },
  email: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  routes: {
    flex: 1,
    gap: SPACING.LABEL_BOTTOM,
    paddingTop: SPACING.CARD_PADDING,
  },
  item: {
    borderRadius: RADII.CONTROL,
    paddingHorizontal: SPACING.CARD_PADDING,
    paddingVertical: SPACING.CARD_PADDING * 0.75,
  },
  itemActive: {
    backgroundColor: COLORS.SURFACE_TINT,
  },
  itemText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  itemTextActive: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  version: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    paddingHorizontal: SPACING.CARD_PADDING,
    paddingBottom: SPACING.LABEL_BOTTOM,
  },
  logout: {
    borderRadius: RADII.CONTROL,
    paddingHorizontal: SPACING.CARD_PADDING,
    paddingVertical: SPACING.CARD_PADDING * 0.75,
  },
  logoutText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.ERROR,
    fontWeight: '700',
  },
});
