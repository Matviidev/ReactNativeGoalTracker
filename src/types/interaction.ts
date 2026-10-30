import type { PressableStateCallbackType } from 'react-native';

export type InteractionState = PressableStateCallbackType & {
  hovered?: boolean;
  focused?: boolean;
};
