import { useCallback, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { EmptyState } from '@/components/empty-state';
import { GoalInput } from '@/components/goal-input';
import { GoalItem } from '@/components/goal-item';
import {
  Colors,
  FontFamily,
  FontSize,
  Layout,
  LineHeight,
  Radius,
  Spacing,
} from '@/constants/theme';
import { useGoals } from '@/hooks/use-goals';
import { useIsWide } from '@/hooks/use-is-wide';
import type { Goal } from '@/types/goal';
import { confirm } from '@/utils/confirm';

const goalImage = require('@/assets/goal.png');

const DELETE_ACTION_VERB = Platform.OS === 'web' ? 'Click' : 'Tap';

export default function GoalsScreen() {
  const { goals, addGoal, deleteGoal } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isWide = useIsWide();
  const insets = useSafeAreaInsets();

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
  const horizontalPadding = isWide ? Spacing.xl : Spacing.lg;

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.topBar}>
        <View
          style={[styles.container, styles.topBarContent, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Image style={styles.logoImage} source={goalImage} />
            </View>
            <Text style={styles.brandName}>Goal Tracker</Text>
          </View>
          <AppButton title="New goal" size="sm" onPress={openModal} />
        </View>
      </SafeAreaView>
      <GoalInput visible={isModalVisible} onAddGoal={handleAddGoal} onCancel={closeModal} />
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        renderItem={({ item, index }) => (
          <GoalItem goal={item} index={index} onDelete={handleDeleteGoal} />
        )}
        ListHeaderComponent={
          <View style={[styles.pageHeader, isWide && styles.pageHeaderWide]}>
            <Text style={[styles.heading, isWide && styles.headingWide]}>Goals</Text>
            <Text style={styles.subheading}>
              {goals.length > 0
                ? `${goalCountLabel} · ${DELETE_ACTION_VERB} a goal to delete it`
                : 'Plan what matters and keep it in sight.'}
            </Text>
          </View>
        }
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={<EmptyState onCreate={openModal} />}
        style={styles.list}
        contentContainerStyle={[
          styles.container,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: insets.bottom + Spacing.xxxl,
          },
        ]}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
  topBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.backgroundElevated,
  },
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Layout.topBarHeight,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + Spacing.xxs,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.surface,
  },
  logoImage: {
    width: 16,
    height: 16,
  },
  brandName: {
    color: Colors.text,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.body,
  },
  list: {
    flex: 1,
  },
  pageHeader: {
    gap: Spacing.xs,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  pageHeaderWide: {
    paddingTop: Spacing.xxxl,
  },
  heading: {
    color: Colors.text,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.heading,
    lineHeight: LineHeight.heading,
    letterSpacing: -0.4,
  },
  headingWide: {
    fontSize: FontSize.display,
    lineHeight: LineHeight.display,
    letterSpacing: -0.8,
  },
  subheading: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
  },
  separator: {
    height: Spacing.sm,
  },
});
