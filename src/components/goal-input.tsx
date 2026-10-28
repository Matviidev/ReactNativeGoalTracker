import { useState } from 'react';
import { Button, Image, Modal, StyleSheet, TextInput, View } from 'react-native';

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
          <View style={styles.action}>
            <Button title="Cancel" onPress={onCancel} color="#f31282" />
          </View>
          <View style={styles.action}>
            <Button title="Add Goal" onPress={handleAdd} color="#b180f0" />
          </View>
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
    padding: 16,
    backgroundColor: '#311b6b',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    width: '100%',
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#e4d0ff',
    color: '#120438',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  action: {
    width: 100,
    marginHorizontal: 8,
  },
});
