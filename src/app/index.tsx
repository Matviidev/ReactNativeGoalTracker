import { useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';

import { GoalItem } from '@/components/goal-item';
import type { Goal } from '@/types/goal';

export default function GoalsScreen() {
  const [enteredText, setEnteredText] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal() {
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), text: enteredText },
    ]);
    setEnteredText('');
  }

  function handleDeleteGoal(id: string) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          value={enteredText}
          onChangeText={setEnteredText}
        />
        <Button title="Add Goal" onPress={handleAddGoal} />
      </View>
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        renderItem={({ item }) => <GoalItem goal={item} onDelete={handleDeleteGoal} />}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 24,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 8,
  },
});
