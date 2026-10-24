import { ActivityIndicator, Text, View } from 'react-native';
import { CHART_COLORS, COLORS, EXPENSE_TYPE_COLORS } from '@/shared/theme';
import { DonutChart } from './donut-chart';
import { styles } from './dashboard-card-styles';
import type { Dashboard } from './dashboard-types';
import type { ExpenseType } from '@/modules/expense';

const TYPES: {
  background: string;
  color: string;
  icon: string;
  label: string;
  type: ExpenseType;
}[] = [
  {
    background: '#2B1C25',
    color: EXPENSE_TYPE_COLORS.NEED,
    icon: '!',
    label: 'Need',
    type: 'NEED',
  },
  {
    background: '#2C271C',
    color: EXPENSE_TYPE_COLORS.WANT,
    icon: '*',
    label: 'Want',
    type: 'WANT',
  },
  {
    background: '#1A2A25',
    color: EXPENSE_TYPE_COLORS.SAVE,
    icon: '+',
    label: 'Save',
    type: 'SAVE',
  },
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
    ...top.map((c, i) => ({ color: CHART_COLORS[i], value: c.total })),
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
    <View style={styles.card}>
      <Text style={styles.caption}>This month</Text>
      <Text style={styles.total}>
        AED {formatAmount(dashboard.totalExpense)}
      </Text>

      <View style={styles.types}>
        {TYPES.map(({ background, color, icon, label, type }) => {
          const amount = dashboard.totalByType[type] ?? 0;
          const share = dashboard.totalExpense
            ? Math.round((amount / dashboard.totalExpense) * 100)
            : 0;

          return (
            <View
              key={type}
              style={[styles.typeBox, { backgroundColor: background }]}
            >
              <View style={styles.typeHeader}>
                <View style={[styles.icon, { backgroundColor: color }]}>
                  <Text style={styles.iconText}>{icon}</Text>
                </View>
                <Text style={styles.typeLabel}>{label}</Text>
              </View>
              <Text numberOfLines={1} style={styles.typeAmount}>
                AED {formatAmount(amount)}
              </Text>
              <Text style={styles.typeShare}>{share}% of total</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.chart}>
        <DonutChart size={200} slices={slices}>
          <Text style={styles.chartCaption}>Total</Text>
          <Text style={styles.chartTotal}>
            AED {formatAmount(dashboard.totalExpense)}
          </Text>
        </DonutChart>
      </View>

      <View style={styles.legend}>
        {top.map((category, i) => {
          const share = dashboard.totalExpense
            ? Math.round((category.total / dashboard.totalExpense) * 100)
            : 0;

          return (
            <View key={category.categoryId} style={styles.legendRow}>
              <View
                style={[styles.legendDot, { backgroundColor: CHART_COLORS[i] }]}
              />
              <Text numberOfLines={1} style={styles.legendName}>
                {category.categoryName}
              </Text>
              <Text style={styles.legendShare}>{share}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
