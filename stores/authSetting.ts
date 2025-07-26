import _ from 'lodash';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { TAuthSetting } from '@/types/authSetting';

type TState = TAuthSetting;

type TActions = {
  reset: (data?: TState) => void;
};

const initValue: TState = {
  enable: false,
  entryPage: '',
  loggedInPage: '',
  pages: [],
  projectId: '',
  refreshAction: undefined,
  forbiddenCode: 403,
};

export const authSettingStore = createWithEqualityFn<TState & TActions>()(
  devtools(
    (set) => ({
      ...initValue,

      reset: (data) => {
        set(_.isEmpty(data) ? initValue : data);
      },
    }),
    {
      name: 'authSettingStore',
    }
  )
);
