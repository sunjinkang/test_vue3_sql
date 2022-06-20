import { defineStore } from 'pinia';
import { SystemRole } from '../data/common';
import StorageKey from '../data/StorageKey';
import LocalStorageWrapper from '../utils/LocalStorageWrapper';

type UserState = {
  username: string;
  role: SystemRole | '';
  token: string;
  theme: string;
};

const initialState: UserState = {
  username: '',
  role: '',
  token: LocalStorageWrapper.getOrDefault(StorageKey.Token, ''),
  theme: '',
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    ...initialState,
  }),
  actions: {
    updateUser(data: { username: string; role: SystemRole | '' }) {
      this.$state.username = data.username;
      this.$state.role = data.role;
    },
    updateTheme(theme: string) {
      this.$state.theme = theme;
    },
    updateToken(token: string) {
      this.$state.token = token;
      LocalStorageWrapper.set(StorageKey.Token, token);
    },
  },
});
