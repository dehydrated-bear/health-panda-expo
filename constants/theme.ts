/**
 * Health Panda Design System — Theme & Design Tokens
 * Brand palette: Sky · Yellow · Orange · Coral
 */

import { Platform } from 'react-native';

// ─── Brand Palette ─────────────────────────────────────────────────────────────
export const PandaColors = {
  // Core brand
  sky:    '#8CE4FF',  // rgb(140, 228, 255)
  yellow: '#FEEE91',  // rgb(254, 238, 145)
  orange: '#FFA239',  // rgb(255, 162, 57)
  coral:  '#FF5656',  // rgb(255, 86, 86)

  // Neutrals
  bg:          '#FAFBFF',
  surface:     '#FFFFFF',
  card:        '#FFFFFF',
  border:      '#EBF0F7',
  borderFocus: '#8CE4FF',
  shadow:      '#CBD5E1',

  // Semantic
  primary:   '#FFA239',
  secondary: '#8CE4FF',
  success:   '#34D399',
  warning:   '#FEEE91',
  danger:    '#FF5656',
  purple:    '#C4B5FD',
  teal:      '#2DD4BF',

  // Text
  textPrimary: '#1A1A2E',
  textSecond:  '#64748B',
  textMuted:   '#94A3B8',
  textWhite:   '#FFFFFF',
} as const;

// ─── Spacing ───────────────────────────────────────────────────────────────────
export const PandaSpacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 28,
  xxxl: 40,
} as const;

// ─── Border Radius ─────────────────────────────────────────────────────────────
export const PandaRadius = {
  xs:   6,
  sm:   10,
  md:   14,
  lg:   18,
  xl:   24,
  pill: 999,
} as const;

// ─── Typography ────────────────────────────────────────────────────────────────
export const PandaTypography = {
  display:  { fontSize: 32, fontWeight: '800' as const },
  h1:       { fontSize: 26, fontWeight: '800' as const },
  h2:       { fontSize: 22, fontWeight: '700' as const },
  h3:       { fontSize: 18, fontWeight: '700' as const },
  h4:       { fontSize: 16, fontWeight: '600' as const },
  body:     { fontSize: 15, fontWeight: '400' as const },
  bodyBold: { fontSize: 15, fontWeight: '700' as const },
  caption:  { fontSize: 12, fontWeight: '400' as const },
  micro:    { fontSize: 10, fontWeight: '500' as const },
  label:    { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.2 as number },
} as const;

// ─── Shadows ───────────────────────────────────────────────────────────────────
export const PandaShadows = {
  sm: {
    shadowColor: '#CBD5E1',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  md: {
    shadowColor: '#CBD5E1',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lg: {
    shadowColor: '#CBD5E1',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  orangeGlow: {
    shadowColor: '#FFA239',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  skyGlow: {
    shadowColor: '#8CE4FF',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
} as const;

// ─── Animation Durations ───────────────────────────────────────────────────────
export const PandaAnim = {
  fast:   150,
  normal: 300,
  slow:   600,
  breath: 2400,
  pulse:  900,
} as const;

// ─── Legacy Colors (for backward compatibility) ────────────────────────────────
const tintColorLight = PandaColors.orange;
const tintColorDark  = '#fff';

export const Colors = {
  light: {
    text:           PandaColors.textPrimary,
    background:     PandaColors.bg,
    tint:           tintColorLight,
    icon:           PandaColors.textSecond,
    tabIconDefault: PandaColors.textSecond,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text:           '#ECEDEE',
    background:     '#151718',
    tint:           tintColorDark,
    icon:           '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:   "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:    "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
