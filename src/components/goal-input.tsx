import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { GOAL_MAX_LENGTH } from '@/constants/goals';
import {
  Colors,
  FontFamily,
  FontSize,
  Layout,
  LineHeight,
  Radius,
  Shadow,
  Spacing,
} from '@/constants/theme';

const goalImage = require('@/assets/goal.png');

const IS_DIALOG = Platform.OS === 'web';
const COUNTER_WARNING_THRESHOLD = GOAL_MAX_LENGTH - 10;

type GoalInputProps = {
  visible: boolean;
  onAddGoal: (text: string) => void;
  onCancel: () => void;
};

export function GoalInput({ visible, onAddGoal, onCancel }: GoalInputProps) {
  const [enteredText, setEnteredText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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

  const form = (
    <View style={styles.form}>
      <View style={styles.header}>
        <Text style={styles.title}>New goal</Text>
        <Text style={styles.description}>What do you want to achieve?</Text>
      </View>
      <View style={styles.field}>
        <TextInput
          style={[styles.textInput, isFocused && styles.textInputFocused]}
          placeholder="e.g. Finish the React Native course"
          placeholderTextColor={Colors.inputPlaceholder}
          value={enteredText}
          onChangeText={setEnteredText}
          onSubmitEditing={handleAdd}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={GOAL_MAX_LENGTH}
          returnKeyType="done"
          selectionColor={Colors.primary}
          autoFocus
        />
        <View style={styles.meta}>
          <Text style={styles.hint}>{IS_DIALOG ? 'Enter to add · Esc to cancel' : ''}</Text>
          <Text
            style={[
              styles.counter,
              enteredText.length >= COUNTER_WARNING_THRESHOLD && styles.counterWarning,
            ]}>
            {enteredText.length}/{GOAL_MAX_LENGTH}
          </Text>
        </View>
      </View>
      <View style={[styles.actions, IS_DIALOG && styles.actionsDialog]}>
        <AppButton
          title="Cancel"
          variant="outline"
          size={IS_DIALOG ? 'sm' : 'md'}
          onPress={handleCancel}
          style={!IS_DIALOG && styles.action}
        />
        <AppButton
          title="Add goal"
          size={IS_DIALOG ? 'sm' : 'md'}
          onPress={handleAdd}
          disabled={!canSubmit}
          style={!IS_DIALOG && styles.action}
        />
      </View>
    </View>
  );

  if (IS_DIALOG) {
    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
        <View style={styles.overlay}>
          <Pressable
            focusable={false}
            accessibilityLabel="Close dialog"
            onPress={handleCancel}
            style={styles.backdrop}
          />
          <View role="dialog" aria-modal aria-label="New goal" style={styles.dialog}>
            {form}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleCancel}>
      <SafeAreaView style={styles.sheet}>
        <KeyboardAvoidingView
          style={styles.sheetContent}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.iconWrapper}>
            <Image style={styles.image} source={goalImage} />
          </View>
          {form}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.backdrop,
  },
  dialog: {
    width: '100%',
    maxWidth: Layout.maxDialogWidth,
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.backgroundElevated,
    boxShadow: Shadow.dialog,
  },
  sheet: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sheetContent: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    marginBottom: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  image: {
    width: 36,
    height: 36,
  },
  form: {
    width: '100%',
    gap: Spacing.xl,
  },
  header: {
    gap: Spacing.xs,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.title,
    lineHeight: LineHeight.title,
  },
  description: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
  },
  field: {
    gap: Spacing.sm,
  },
  textInput: {
    minHeight: 44,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + Spacing.xxs,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
  },
  textInputFocused: {
    borderColor: Colors.focusRing,
    boxShadow: `0px 0px 0px 3px ${Colors.primarySubtle}`,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  hint: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    lineHeight: LineHeight.caption,
  },
  counter: {
    color: Colors.textMuted,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    lineHeight: LineHeight.caption,
    fontVariant: ['tabular-nums'],
  },
  counterWarning: {
    color: Colors.dangerText,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionsDialog: {
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  action: {
    flex: 1,
  },
});
