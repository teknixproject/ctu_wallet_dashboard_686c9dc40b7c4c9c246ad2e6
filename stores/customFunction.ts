import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TCustomFunction } from '@/types';

type State = {
  customFunctions: {
    [key: string]: TCustomFunction;
  };
};
type TActions = {
  setCustomFunctions: (data: TCustomFunction[]) => void;
  findCustomFunction: (id: string) => TCustomFunction;
  reset: () => void;
};

const initValues: State = {
  customFunctions: {},
};
export const customFunctionStore = create<State & TActions>()(
  devtools(
    (set, get) => ({
      ...initValues,
      setCustomFunctions(data) {
        const oldData = get().customFunctions || {};

        // Only include new items from data that don't exist in oldData
        const newData = data?.reduce(
          (acc, item) => {
            if (!(item._id in oldData)) {
              acc[item._id] = item;
            }
            return acc;
          },
          { ...oldData }
        );

        return set({
          customFunctions: newData,
        });
      },
      findCustomFunction(id) {
        return get()?.customFunctions?.[id];
      },
      reset() {
        return set(initValues);
      },
    }),
    {
      name: 'customFunction',
    }
  )
);
