<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isUpdate ? '修改用户' : '创建用户'"
    :before-close="handleClose"
  >
    <el-form :model="userForm" ref="userFormRef" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" :disabled="isUpdate" />
      </el-form-item>
      <el-form-item label="密码" v-if="!isUpdate" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" v-if="!isUpdate" prop="passwordConfirm">
        <el-input v-model="userForm.passwordConfirm" type="password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" />
      </el-form-item>
      <el-form-item label="微信id" prop="wechat">
        <el-input v-model="userForm.wechat" />
      </el-form-item>
      <el-form-item label="角色" prop="roleNameList">
        <el-select v-model="userForm.roleNameList" class="m-2" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.role_name"
            :label="item.role_name"
            :value="item.role_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属用户组" prop="userGroupList">
        <el-select v-model="userForm.userGroupList" class="m-2" placeholder="请选择所属用户组">
          <el-option
            v-for="item in userGroupList"
            :key="item.user_group_name"
            :label="item.user_group_name"
            :value="item.user_group_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="禁用用户" v-if="isUpdate && !isAdmin" prop="disabled">
        <el-switch v-model="userForm.disabled" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(userFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(userFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { nameRule } from '../../../../../utils/FormRule';
import { useUserManageStore } from '../../../../../store/userManage';
import { ModalName } from '../../../../../data/ModalName';
import useRole from '../../../../../hooks/useRole';
import useUserGroup from '../../../../../hooks/useUserGroup';

export default defineComponent({
  name: 'UserForm',
  props: ['isUpdate', 'isAdmin', 'dialogVisible', 'selectUser'],
  emits: ['handleGetData'],
  setup(props, context) {
    const userFormRef = ref<FormInstance>();
    const useUserManage = useUserManageStore();
    let userForm = reactive({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      wechat: '',
      roleNameList: [],
      userGroupList: [],
      disabled: '',
    });
    const {
      list: roleList,
      updateRoleList,
    } = useRole();
    const {
      group: userGroupList,
      updateUserGroupList,
    } = useUserGroup();

    const nameRules = () => {
      const baseRules = [
        {
          required: true,
          message: '用户名不能为空',
        },
      ];
      if (props.isUpdate) {
        return baseRules;
      }
      return [...baseRules, ...nameRule()];
    };
    const rules = reactive<FormRules>({
      username: [
        ...nameRules()
      ],
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
            if (value !== userForm.password) {
              callback(new Error("密码不一致"))
            } else {
              callback()
            }
          }
        }
      ],
      email: [
        {
          required: true,
          message: '邮件不能为空',
          trigger: 'change',
        },
      ],
    });

    const handleClose = (formEl: FormInstance | undefined) => {
      useUserManage.updateModalStatus({
        modalName: !props.isUpdate ? ModalName.Add_User : ModalName.Update_User,
        status: false,
      });
      if (!formEl) return;
      formEl.resetFields();
    };

    const handleSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid: boolean) => {
        if (valid) {
          context.emit('handleGetData', userForm);
        }
      });
    }

    watch([() => props.dialogVisible, () => props.selectUser], (val, preVal) => {
      if (val[0] !== preVal[0] && val[0] && val[1]) {
        userForm = { ...val[1] };
        updateRoleList();
        updateUserGroupList();
      }
    }, {
      immediate: true,
      deep: true
    });

    return {
      ...toRefs(userForm),
      userFormRef,
      handleClose,
      userForm,
      rules,
      handleSubmit,
      roleList,
      userGroupList,
    }
  }
});
</script>