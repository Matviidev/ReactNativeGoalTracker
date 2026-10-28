import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import { GoalInput } from '@/components/goal-input';
import { GoalItem } from '@/components/goal-item';
import type { Goal } from '@/types/goal';

export default function GoalsScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  function handleAddGoal(text: string) {
    setGoals((currentGoals) => [...currentGoals, { id: Math.random().toString(), text }]);
    closeModal();
  }

  function handleDeleteGoal(id: string) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" color="#a065ec" onPress={openModal} />
      <GoalInput visible={isModalVisible} onAddGoal={handleAddGoal} onCancel={closeModal} />
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        renderItem={({ item }) => <GoalItem goal={item} onDelete={handleDeleteGoal} />}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
