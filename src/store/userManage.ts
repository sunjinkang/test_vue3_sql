import { defineStore } from 'pinia';
import {
  IUserResV1,
} from '../api/common';
import { ModalName } from '../data/ModalName';
import { ModalStatus } from './common.type';

type UserManageReduxState = {
  modalStatus: ModalStatus;
  selectUser: IUserResV1 | null;
  refreshTable: boolean;
};

const initialState: UserManageReduxState = {
  selectUser: null,
  modalStatus: {},
  refreshTable: false,
};

export const useUserManageStore = defineStore({
  id: 'userManage',
  state: () => ({
    ...initialState,
  }),
  actions: {
    updateSelectUser(data: IUserResV1 | null) {
      this.$state.selectUser = data;
    },
    initModalStatus(modalStatus: ModalStatus) {
      this.$state.modalStatus = modalStatus;
    },
    updateModalStatus(data: { modalName: ModalName; status: boolean }) {
      if (Object.prototype.hasOwnProperty.call(this.$state.modalStatus, data.modalName)) {
        this.$state.modalStatus[data.modalName] = data.status;
      }
    },
    updateRefreshStatus() {
      this.$state.refreshTable = !this.$state.refreshTable;
    },
  },
});
