import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontFamily, FontSize, Radius, Shadow, Spacing } from '@/constants/theme';
import type { InteractionState } from '@/types/interaction';

type ButtonVariant = 'primary' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

type VariantColors = {
  idle: string;
  hovered: string;
  pressed: string;
  text: string;
};

const VARIANT_COLORS: Record<ButtonVariant, VariantColors> = {
  primary: {
    idle: Colors.primary,
    hovered: Colors.primaryHover,
    pressed: Colors.primaryPressed,
    text: Colors.textOnAccent,
  },
  danger: {
    idle: Colors.danger,
    hovered: Colors.dangerHover,
    pressed: Colors.dangerPressed,
    text: Colors.textOnAccent,
  },
  outline: {
    idle: Colors.surface,
    hovered: Colors.surfaceHover,
    pressed: Colors.surfacePressed,
    text: Colors.text,
  },
};

function resolveBackground(colors: VariantColors, { pressed, hovered }: InteractionState) {
  if (pressed) {
    return colors.pressed;
  }
  return hovered ? colors.hovered : colors.idle;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: AppButtonProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={(state: InteractionState) => [
        styles.button,
        size === 'sm' ? styles.small : styles.medium,
        variant === 'outline' ? styles.outline : styles.filled,
        { backgroundColor: disabled ? colors.idle : resolveBackground(colors, state) },
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.title, size === 'sm' && styles.titleSmall, { color: colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
    cursor: 'pointer',
  },
  medium: {
    minHeight: 44,
    paddingHorizontal: Spacing.lg,
  },
  small: {
    minHeight: 34,
    paddingHorizontal: Spacing.md,
  },
  filled: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: Shadow.card,
  },
  outline: {
    borderColor: Colors.borderStrong,
  },
  disabled: {
    opacity: 0.45,
    cursor: 'auto',
    boxShadow: 'none',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.body,
  },
  titleSmall: {
    fontSize: FontSize.small,
  },
});
