import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from '@/shared/theme';
import { DonutChart } from './donut-chart';
import { styles } from './dashboard-card-styles';
import type { Dashboard } from './dashboard-types';
import type { ExpenseType } from '@/modules/expense';

const TYPES: { color: string; label: string; type: ExpenseType }[] = [
  { color: COLORS.ERROR, label: 'Need', type: 'NEED' },
  { color: COLORS.WARNING, label: 'Want', type: 'WANT' },
  { color: COLORS.SUCCESS, label: 'Save', type: 'SAVE' },
];

const CATEGORY_COLORS = [
  COLORS.PRIMARY,
  COLORS.INFO,
  COLORS.SUCCESS,
  COLORS.WARNING,
  COLORS.ERROR,
];

const formatAmount = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 2 });

interface DashboardCardProps {
  dashboard: Dashboard | null;
  error: string | null;
  isLoading: boolean;
}

export const DashboardCard = ({
  dashboard,
  error,
  isLoading,
}: DashboardCardProps) => {
  const top = dashboard
    ? [...dashboard.totalByCategory]
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
    : [];
  const topSum = top.reduce((sum, c) => sum + c.total, 0);
  const rest = dashboard ? Math.max(dashboard.totalExpense - topSum, 0) : 0;
  const slices = [
    ...top.map((c, i) => ({ color: CATEGORY_COLORS[i], value: c.total })),
    ...(rest > 0 ? [{ color: COLORS.BORDER_SUBTLE, value: rest }] : []),
  ];

  if (!dashboard) {
    return isLoading ? (
      <ActivityIndicator style={styles.message} />
    ) : (
      <Text style={styles.message}>{error ?? 'No data yet.'}</Text>
    );
  }

  return (
    <>
      {
        <View style={styles.card}>
          <Text style={styles.caption}>Total expenses</Text>
          <Text style={styles.total}>
            {formatAmount(dashboard.totalExpense)}
          </Text>

          <View style={styles.types}>
            {TYPES.map(({ color, label, type }) => (
              <View key={type} style={styles.typeBox}>
                <View style={styles.typeHeader}>
                  <View style={[styles.dot, { backgroundColor: color }]} />
                  <Text style={styles.typeLabel}>{label}</Text>
                </View>
                <Text style={styles.typeAmount}>
                  {formatAmount(dashboard.totalByType[type] ?? 0)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.chart}>
            <DonutChart size={200} slices={slices}>
              <Text style={styles.chartCaption}>Total</Text>
              <Text style={styles.chartTotal}>
                {formatAmount(dashboard.totalExpense)}
              </Text>
            </DonutChart>
          </View>

          <View style={styles.legend}>
            {top.map((c, i) => (
              <View key={c.categoryId} style={styles.legendRow}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: CATEGORY_COLORS[i] },
                  ]}
                />
                <Text numberOfLines={1} style={styles.legendName}>
                  {c.categoryName}
                </Text>
              </View>
            ))}
          </View>
        </View>
      }
    </>
  );
};
