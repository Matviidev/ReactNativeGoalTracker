import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { GOAL_MAX_LENGTH } from '@/constants/goals';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

const goalImage = require('@/assets/goal.png');

type GoalInputProps = {
  visible: boolean;
  onAddGoal: (text: string) => void;
  onCancel: () => void;
};

export function GoalInput({ visible, onAddGoal, onCancel }: GoalInputProps) {
  const [enteredText, setEnteredText] = useState('');
  const trimmedText = enteredText.trim();
  const canSubmit = trimmedText.length > 0;

  function resetInput() {
    setEnteredText('');
  }

  function handleAdd() {
    if (!canSubmit) {
      return;
    }
    onAddGoal(trimmedText);
    resetInput();
  }

  function handleCancel() {
    resetInput();
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleCancel}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Image style={styles.image} source={goalImage} />
          <Text style={styles.title}>What do you want to achieve?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal"
            placeholderTextColor={Colors.inputPlaceholder}
            value={enteredText}
            onChangeText={setEnteredText}
            onSubmitEditing={handleAdd}
            maxLength={GOAL_MAX_LENGTH}
            returnKeyType="done"
            autoFocus
          />
          <Text style={styles.counter}>
            {enteredText.length}/{GOAL_MAX_LENGTH}
          </Text>
          <View style={styles.actions}>
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={handleCancel}
              style={styles.action}
            />
            <AppButton
              title="Add Goal"
              onPress={handleAdd}
              disabled={!canSubmit}
              style={styles.action}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  textInput: {
    width: '100%',
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.inputBackground,
    color: Colors.inputText,
    fontSize: FontSize.body,
  },
  counter: {
    alignSelf: 'flex-end',
    marginTop: Spacing.xs,
    color: Colors.textMuted,
    fontSize: FontSize.caption,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    width: '100%',
  },
  action: {
    flex: 1,
  },
});
