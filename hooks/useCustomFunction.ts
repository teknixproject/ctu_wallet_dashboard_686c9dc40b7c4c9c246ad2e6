'use client';
import { stateManagementStore } from '@/stores';
import { customFunctionStore } from '@/stores/customFunction';
import { TAction, TActionCustomFunction } from '@/types';
import { transformVariable } from '@/uitls/tranformVariable';

import { handleCustomFunction as handleFunction } from './handleCustomFunction';
import { TActionsProps } from './useActions';
import { useHandleData } from './useHandleData';

export type TUseActions = {
  handleCustomFunction: (action: TAction<TActionCustomFunction>) => Promise<void>;
};

export const useCustomFunction = (props: TActionsProps): TUseActions => {
  const updateVariables = stateManagementStore((state) => state.updateVariables);
  const findVariable = stateManagementStore((state) => state.findVariable);
  const { getData } = useHandleData({ ...props });
  const findCustomFunction = customFunctionStore((state) => state.findCustomFunction);
  const handleCustomFunction = async (action: TAction<TActionCustomFunction>): Promise<void> => {
    console.log('🚀 ~ handleCustomFunction ~ action:', action);
    try {
      const { customFunctionId, output, isList, outputType } = action?.data || {};
      const typeStore = output?.typeStore || 'appState';
      if (customFunctionId) {
        const result = await handleFunction({
          data: action?.data as TActionCustomFunction,
          findCustomFunction,
          getData,
        });
        const resultStander = transformVariable({
          isList: !!isList,
          type: outputType!,
          value: result,
        });
        console.log('🚀 ~ handleCustomFunction ~ resultStander:', resultStander);

        console.log('🚀 ~ handleCustomFunction ~ output:', output);
        if (output?.variableId) {
          const variable = findVariable({ type: typeStore, id: output.variableId });
          updateVariables({
            type: typeStore,
            dataUpdate: {
              ...variable!,
              type: outputType!,
              isList: !!isList,
              value: resultStander,
            },
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };
  //#endregion

  return { handleCustomFunction };
};
