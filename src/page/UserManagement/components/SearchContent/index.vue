<template>
  <el-form ref="searchFormRef" :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="formInline.filter_user_name" placeholder="请输入要搜索的用户名" />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="formInline.filter_role_name" placeholder="请输入要搜索的角色">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button>重置</el-button>
      <el-button type="primary" @click="onSubmit(searchFormRef)">搜索</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus';
type FormInstance = InstanceType<typeof ElForm>;
const searchFormRef = ref<FormInstance>();
const formInline = reactive({
  filter_user_name: '',
  filter_role_name: '',
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
      console.log(valid);
  })
}
</script>