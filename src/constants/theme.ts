import { Platform } from 'react-native';

export const Colors = {
  background: '#09090b',
  backgroundElevated: '#0e0e11',
  surface: '#131316',
  surfaceHover: '#1a1a1f',
  surfacePressed: '#212127',
  border: '#232329',
  borderStrong: '#34343c',
  primary: '#6e56cf',
  primaryHover: '#7c66dc',
  primaryPressed: '#5d47b8',
  primarySubtle: 'rgba(110, 86, 207, 0.16)',
  primaryText: '#b9abf7',
  danger: '#e5484d',
  dangerHover: '#ec5d5e',
  dangerPressed: '#c93a3f',
  dangerText: '#ff9592',
  text: '#ededef',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  textOnAccent: '#ffffff',
  focusRing: '#8e7cf0',
  inputBackground: '#0b0b0e',
  inputPlaceholder: '#5c5c66',
  backdrop: 'rgba(0, 0, 0, 0.64)',
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
} as const;

export const FontSize = {
  caption: 12,
  small: 13,
  body: 15,
  title: 18,
  heading: 24,
  display: 32,
} as const;

export const LineHeight = {
  caption: 16,
  small: 18,
  body: 22,
  title: 26,
  heading: 30,
  display: 38,
} as const;

const WEB_FONT_FALLBACK = ', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

function withWebFallback(family: string) {
  return Platform.OS === 'web' ? `${family}${WEB_FONT_FALLBACK}` : family;
}

export const FontFamily = {
  regular: withWebFallback('Inter_400Regular'),
  medium: withWebFallback('Inter_500Medium'),
  semibold: withWebFallback('Inter_600SemiBold'),
  bold: withWebFallback('Inter_700Bold'),
} as const;

export const Layout = {
  maxContentWidth: 720,
  maxDialogWidth: 460,
  topBarHeight: 56,
  wideBreakpoint: 768,
} as const;

export const Shadow = {
  card: '0px 1px 2px rgba(0, 0, 0, 0.4)',
  raised: '0px 1px 2px rgba(0, 0, 0, 0.4), 0px 4px 12px rgba(0, 0, 0, 0.25)',
  dialog: '0px 0px 0px 1px rgba(255, 255, 255, 0.04), 0px 16px 48px rgba(0, 0, 0, 0.6)',
} as const;
