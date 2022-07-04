<template>
  <UserForm
    :dialogVisible="visible"
    :isUpdate="false"
    :isAdmin="isAdmin"
    @handleGetData="handleGetData"
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
export default defineComponent({
  name: 'AddUser',
  components: { UserForm },
  setup() {
    const userStore = useUserStore();
    const useUserManage = useUserManageStore();
    const user = reactive({
      isAdmin: userStore.role === SystemRole.admin,
      visible: useUserManage.modalStatus[ModalName.Add_User] ?? false,
    });

    const handleGetData = (data: any) => {
      userService
        .createUserV1({
          user_name: data.username,
          user_password: data.password,
          email: data.email,
          role_name_list: data.roleNameList,
          user_group_name_list: data.userGroupList,
          wechat_id: data.wechat,
        })
        .then((res) => {
          if (res.data.code === ResponseCode.SUCCESS) {
            ElMessage({
              message: `创建用户${data.username}成功！`,
              type: 'success',
            });
            useUserManage.updateModalStatus({
              modalName: ModalName.Add_User,
              status: false,
            });
            useUserManage.updateRefreshStatus();
          }
        });
    };

    watch(
      () => useUserManage.modalStatus[ModalName.Add_User],
      (val, preVal) => {
        if (val !== preVal && val) {
          user.visible = true;
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
