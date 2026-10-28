import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'danger' | 'outline';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const VARIANT_COLORS: Record<ButtonVariant, { idle: string; pressed: string }> = {
  primary: { idle: Colors.primary, pressed: Colors.primaryPressed },
  danger: { idle: Colors.danger, pressed: Colors.dangerPressed },
  outline: { idle: 'transparent', pressed: Colors.surfacePressed },
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
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
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? colors.pressed : colors.idle },
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md - Spacing.xs,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
