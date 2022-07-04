<template>
  <UserForm
    :dialogVisible="visible"
    :isUpdate="true"
    :isAdmin="isAdmin"
    @handleGetData="handleGetData"
    :selectUser="selectUser"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import UserForm from '../UserForm/index.vue';
import { useUserStore } from '../../../../../store/user';
import { useUserManageStore } from '../../../../../store/userManage';
import { ResponseCode, SystemRole } from '../../../../../data/common';
import { ModalName } from '../../../../../data/ModalName';
import userService from '../../../../../api/user';
import { ElMessage } from 'element-plus';
import { IUpdateUserV1Params } from '../../../../../api/user/index.d';
export default defineComponent({
  name: 'UpdateUser',
  components: { UserForm },
  setup() {
    const userStore = useUserStore();
    const useUserManage = useUserManageStore();
    const user = reactive({
      isAdmin: userStore.role === SystemRole.admin,
      visible: useUserManage.modalStatus[ModalName.Update_User] ?? false,
      selectUser: {},
    });

    const handleGetData = (data: any) => {
      const params: IUpdateUserV1Params = {
        user_name: data.username,
        role_name_list: data.roleNameList,
        user_group_name_list: data.userGroupList,
        wechat_id: data.wechat,
      };
      if (!!data.email) {
        params.email = data.email;
      }
      if (data.username !== 'admin') {
        params.is_disabled = !!data.disabled;
      }
      userService.updateUserV1(params).then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          ElMessage({
            message: `修改用户${data.username}成功！`,
            type: 'success',
          });
          useUserManage.updateModalStatus({
            modalName: ModalName.Update_User,
            status: false,
          });
          useUserManage.updateRefreshStatus();
        }
      });
    };

    watch(
      [
        () => useUserManage.modalStatus[ModalName.Update_User],
        () => useUserManage.selectUser,
      ],
      (val, preVal) => {
        user.visible = val[0] !== preVal[0] && val[0];
        if (val[1]) {
          user.selectUser = val[1];
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      ...toRefs(user),
      handleGetData,
    };
  },
});
</script>
