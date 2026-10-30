import { Image, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { Colors, FontFamily, FontSize, LineHeight, Radius, Spacing } from '@/constants/theme';

const goalImage = require('@/assets/goal.png');

type EmptyStateProps = {
  onCreate: () => void;
};

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image style={styles.image} source={goalImage} />
      </View>
      <Text style={styles.title}>No goals yet</Text>
      <Text style={styles.message}>Write down what you want to achieve and keep it in sight.</Text>
      <AppButton title="Create your first goal" size="sm" onPress={onCreate} style={styles.action} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.backgroundElevated,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    marginBottom: Spacing.sm,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  image: {
    width: 36,
    height: 36,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.title,
    lineHeight: LineHeight.title,
  },
  message: {
    maxWidth: 320,
    color: Colors.textSecondary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
    textAlign: 'center',
  },
  action: {
    marginTop: Spacing.md,
  },
});
