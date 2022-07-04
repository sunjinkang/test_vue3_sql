<template>
  <el-menu
    active-text-color="#1890ff"
    background-color="#001529"
    class="el-menu-vertical-demo"
    default-active="2-1-1"
    text-color="#fff"
  >
    <el-menu-item index="1">
      <el-icon><pie-chart /></el-icon>
      <span>Dashboard</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><message-box /></el-icon>
        <span>平台管理</span>
      </template>
      <el-sub-menu index="2-1">
        <template #title>
          <el-icon><user /></el-icon>
          <span>用户中心</span>
        </template>
        <el-menu-item index="2-1-1">用户管理</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>
import { PieChart, User, MessageBox } from '@element-plus/icons-vue';
</script>
<style scoped>
.el-menu {
  height: calc(100% - 60px);
}
</style>
