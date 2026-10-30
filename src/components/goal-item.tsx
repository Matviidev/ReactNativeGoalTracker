import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, LineHeight, Radius, Shadow, Spacing } from '@/constants/theme';
import type { Goal } from '@/types/goal';
import type { InteractionState } from '@/types/interaction';

type GoalItemProps = {
  goal: Goal;
  index: number;
  onDelete: (goal: Goal) => void;
};

function GoalItemComponent({ goal, index, onDelete }: GoalItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={goal.text}
      accessibilityHint="Deletes this goal"
      android_ripple={{ color: Colors.surfacePressed }}
      onPress={() => onDelete(goal)}
      style={({ pressed, hovered }: InteractionState) => [
        styles.item,
        hovered && styles.itemHovered,
        pressed && styles.itemPressed,
      ]}>
      {({ hovered, focused }: InteractionState) => (
        <>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.text}>{goal.text}</Text>
          {(hovered || focused) && <Text style={styles.deleteHint}>Delete</Text>}
        </>
      )}
    </Pressable>
  );
}

export const GoalItem = memo(GoalItemComponent);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    boxShadow: Shadow.card,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  itemHovered: {
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.surfaceHover,
  },
  itemPressed: {
    backgroundColor: Colors.surfacePressed,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 26,
    height: 26,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primarySubtle,
  },
  badgeText: {
    color: Colors.primaryText,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.caption,
    fontVariant: ['tabular-nums'],
  },
  text: {
    flex: 1,
    color: Colors.text,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
  },
  deleteHint: {
    color: Colors.dangerText,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.small,
  },
});
