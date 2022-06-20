<template>
  <el-dialog
    v-model="dialogVisible"
    title="isUpdate : '修改用户' : '创建用户'"
    width="30%"
    :before-close="handleClose"
    ref="userFormRef"
    :model="userForm"
    :rules="rules"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username" :disabled="isUpdate" />
      </el-form-item>
      <el-form-item label="密码" v-if="!isUpdate">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" v-if="!isUpdate">
        <el-input v-model="userForm.passwordConfirm" type="password" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userForm.email" />
      </el-form-item>
      <el-form-item label="微信id">
        <el-input v-model="userForm.wechat" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="userForm.roleNameList" />
      </el-form-item>
      <el-form-item label="所属用户组">
        <el-input v-model="userForm.userGroupList" />
      </el-form-item>
      <el-form-item label="所属用户组" v-if="isUpdate && !isAdmin">
        <el-switch v-model="userForm.disabled" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import type { FormRules } from 'element-plus';
import { nameRule } from '../../../../../utils/FormRule';
export default defineComponent({
  name: 'UserForm',
  props: ['isUpdate', 'isAdmin', 'userFormRef', 'dialogVisible'],
  setup(props) {
    
    const userForm = reactive({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      wechat: '',
      roleNameList: [],
      userGroupList: [],
      disabled: '',
    });

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

    const handleClose = () => {}

    return {
      ...toRefs(userForm),
      handleClose,
      userForm,
      rules,
    }
  }
});
</script>