import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import { GoalInput } from '@/components/goal-input';
import { GoalItem } from '@/components/goal-item';
import { Colors, Spacing } from '@/constants/theme';
import { useGoals } from '@/hooks/use-goals';

export default function GoalsScreen() {
  const { goals, addGoal, deleteGoal } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  function handleAddGoal(text: string) {
    addGoal(text);
    closeModal();
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" color={Colors.primary} onPress={openModal} />
      <GoalInput visible={isModalVisible} onAddGoal={handleAddGoal} onCancel={closeModal} />
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        renderItem={({ item }) => <GoalItem goal={item} onDelete={deleteGoal} />}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Spacing.xl + Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
  },
});
