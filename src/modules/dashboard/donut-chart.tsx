import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/shared/theme';

export interface DonutSlice {
  color: string;
  value: number;
}

interface DonutChartProps {
  children?: React.ReactNode;
  size?: number;
  slices: DonutSlice[];
  thickness?: number;
}

const SEGMENTS = 120;

// Pure-View ring: thin bars rotated around the centre, coloured by cumulative share.
export const DonutChart = ({
  children,
  size = 200,
  slices,
  thickness = 22,
}: DonutChartProps) => {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const barWidth = Math.ceil((Math.PI * size) / SEGMENTS) + 1;

  const colorAt = (ratio: number) => {
    let acc = 0;
    for (const slice of slices) {
      acc += slice.value / total;
      if (ratio < acc) {
        return slice.color;
      }
    }
    return slices[slices.length - 1]?.color ?? COLORS.BORDER_SUBTLE;
  };

  return (
    <View style={{ width: size, height: size }}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <View
          key={i}
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { transform: [{ rotate: `${(i * 360) / SEGMENTS}deg` }] },
          ]}
        >
          <View
            style={{
              alignSelf: 'center',
              backgroundColor:
                total > 0
                  ? colorAt((i + 0.5) / SEGMENTS)
                  : COLORS.BORDER_SUBTLE,
              height: thickness,
              width: barWidth,
            }}
          />
        </View>
      ))}
      <View style={[StyleSheet.absoluteFill, centerStyle]}>{children}</View>
    </View>
  );
};

const centerStyle = { alignItems: 'center', justifyContent: 'center' } as const;
