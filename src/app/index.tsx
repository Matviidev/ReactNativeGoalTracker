import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { EmptyState } from '@/components/empty-state';
import { GoalInput } from '@/components/goal-input';
import { GoalItem } from '@/components/goal-item';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { useGoals } from '@/hooks/use-goals';
import type { Goal } from '@/types/goal';
import { confirm } from '@/utils/confirm';

export default function GoalsScreen() {
  const { goals, addGoal, deleteGoal } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  function handleAddGoal(text: string) {
    addGoal(text);
    closeModal();
  }

  const handleDeleteGoal = useCallback(
    (goal: Goal) => {
      confirm({
        title: 'Delete goal?',
        message: `"${goal.text}" will be removed.`,
        confirmText: 'Delete',
        onConfirm: () => deleteGoal(goal.id),
      });
    },
    [deleteGoal],
  );

  const goalCountLabel = goals.length === 1 ? '1 goal' : `${goals.length} goals`;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.heading}>Goal Tracker</Text>
        <Text style={styles.subheading}>
          {goals.length > 0 ? `${goalCountLabel} · tap one to delete` : 'Plan what matters'}
        </Text>
      </View>
      <AppButton title="Add New Goal" onPress={openModal} />
      <GoalInput visible={isModalVisible} onAddGoal={handleAddGoal} onCancel={closeModal} />
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        renderItem={({ item, index }) => (
          <GoalItem goal={item} index={index} onDelete={handleDeleteGoal} />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={[styles.list, goals.length === 0 && styles.listEmpty]}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  heading: {
    color: Colors.text,
    fontSize: FontSize.heading,
    fontWeight: '800',
  },
  subheading: {
    color: Colors.textSecondary,
    fontSize: FontSize.body,
  },
  list: {
    paddingVertical: Spacing.lg,
  },
  listEmpty: {
    flexGrow: 1,
  },
  separator: {
    height: Spacing.sm,
  },
});
