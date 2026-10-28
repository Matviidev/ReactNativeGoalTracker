import { Pressable, StyleSheet, Text } from 'react-native';

import type { Goal } from '@/types/goal';

type GoalItemProps = {
  goal: Goal;
  onDelete: (id: string) => void;
};

export function GoalItem({ goal, onDelete }: GoalItemProps) {
  return (
    <Pressable
      android_ripple={{ color: '#210644' }}
      onPress={() => onDelete(goal.id)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
      <Text style={styles.text}>{goal.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  itemPressed: {
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    padding: 8,
  },
});
