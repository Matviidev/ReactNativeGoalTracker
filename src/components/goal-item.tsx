import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import type { Goal } from '@/types/goal';

type GoalItemProps = {
  goal: Goal;
  index: number;
  onDelete: (goal: Goal) => void;
};

function GoalItemComponent({ goal, index, onDelete }: GoalItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Deletes this goal"
      android_ripple={{ color: Colors.surfacePressed }}
      onPress={() => onDelete(goal)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
      <Text style={styles.index}>{index + 1}</Text>
      <Text style={styles.text}>{goal.text}</Text>
    </Pressable>
  );
}

export const GoalItem = memo(GoalItemComponent);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderLeftWidth: Spacing.xs,
    borderLeftColor: Colors.primary,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  itemPressed: {
    backgroundColor: Colors.surfacePressed,
  },
  index: {
    minWidth: Spacing.lg,
    color: Colors.textMuted,
    fontSize: FontSize.caption,
    fontWeight: '700',
  },
  text: {
    flex: 1,
    color: Colors.text,
    fontSize: FontSize.body,
    lineHeight: 22,
  },
});
