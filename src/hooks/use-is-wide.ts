import { useWindowDimensions } from 'react-native';

import { Layout } from '@/constants/theme';

export function useIsWide() {
  const { width } = useWindowDimensions();
  return width >= Layout.wideBreakpoint;
}
