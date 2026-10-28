import { useCallback, useState } from 'react';

import type { Goal } from '@/types/goal';
import { createId } from '@/utils/create-id';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = useCallback((text: string) => {
    setGoals((currentGoals) => [...currentGoals, { id: createId(), text }]);
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  }, []);

  return { goals, addGoal, deleteGoal };
}
