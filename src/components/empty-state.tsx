import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

const goalImage = require('@/assets/goal.png');

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={goalImage} />
      <Text style={styles.title}>No goals yet</Text>
      <Text style={styles.message}>Tap &quot;Add New Goal&quot; to set your first one.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: Spacing.sm,
    opacity: 0.8,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  message: {
    color: Colors.textSecondary,
    fontSize: FontSize.body,
    textAlign: 'center',
  },
});
