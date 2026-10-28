import { useState } from 'react';
import { Image, Modal, StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { Colors, Radius, Spacing } from '@/constants/theme';

const goalImage = require('@/assets/goal.png');

type GoalInputProps = {
  visible: boolean;
  onAddGoal: (text: string) => void;
  onCancel: () => void;
};

export function GoalInput({ visible, onAddGoal, onCancel }: GoalInputProps) {
  const [enteredText, setEnteredText] = useState('');

  function handleAdd() {
    onAddGoal(enteredText);
    setEnteredText('');
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.container}>
        <Image style={styles.image} source={goalImage} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          value={enteredText}
          onChangeText={setEnteredText}
        />
        <View style={styles.actions}>
          <AppButton title="Cancel" variant="danger" onPress={onCancel} style={styles.action} />
          <AppButton title="Add Goal" onPress={handleAdd} style={styles.action} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.background,
  },
  image: {
    width: 100,
    height: 100,
    margin: Spacing.lg,
  },
  textInput: {
    width: '100%',
    padding: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Colors.inputBackground,
    color: Colors.inputText,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  action: {
    minWidth: 120,
  },
});
