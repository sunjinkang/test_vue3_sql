<template>
  <el-dialog
    v-model="visible"
    title="修改密码"
    :before-close="handleClose"
  >
    <el-form :model="passwordForm" ref="passwordFormRef" :rules="rules" label-width="120px">
      <el-form-item label="密码" prop="password">
        <el-input v-model="passwordForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirm">
        <el-input v-model="passwordForm.passwordConfirm" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(passwordFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(passwordFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserManageStore } from '../../../../../store/userManage';
import { ModalName } from '../../../../../data/ModalName';
import userService from '../../../../../api/user';
import { ResponseCode } from '../../../../../data/common';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'ModifyUserPassword',
  setup() {
    const passwordFormRef = ref<FormInstance>();
    const useUserManage = useUserManageStore();
    let passwordForm = reactive({
      password: '',
      passwordConfirm: '',
    });
    let dialogVisible = reactive({
      visible: false
    });

    const rules = reactive<FormRules>({
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'change',
        },
      ],
      passwordConfirm: [
        {
          required: true,
          message: '确认密码不能为空',
          trigger: 'change',
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value !== passwordForm.password) {
              callback(new Error("密码不一致"))
            } else {
              callback()
            }
          }
        }
      ],
    });

    const handleClose = (formEl: FormInstance | undefined) => {
      useUserManage.updateModalStatus({
        modalName: ModalName.Update_User_Password,
        status: false,
      });
      if (!formEl) return;
      formEl.resetFields();
    };

    const handleSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid: boolean) => {
        if (valid) {
          console.log(passwordForm);
          userService.UpdateOtherUserPasswordV1({
            user_name: useUserManage.selectUser?.user_name ?? '',
            password: passwordForm.password,
          })
          .then((res) => {
            if (res.data.code === ResponseCode.SUCCESS) {
              ElMessage({
                message: '修改密码成功！',
                type: 'success',
              });
              handleClose(undefined);
            }
          });
        }
      });
    }

    watch(() => useUserManage.modalStatus[ModalName.Update_User_Password], (val, preVal) => {
      if (val !== preVal && val) {
        dialogVisible.visible = val;
      }
    }, {
      immediate: true,
      deep: true,
    });

    return {
      ...toRefs(passwordForm),
      ...toRefs(dialogVisible),
      passwordFormRef,
      handleClose,
      passwordForm,
      rules,
      handleSubmit,
    }
  }
});
</script>