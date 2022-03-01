<template>
  <el-container>
    <el-header>
      <div>头部</div>
    </el-header>
    <el-container>
      <el-aside>
        <el-scrollbar>
          菜单
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
export default {
  name: 'Container',
};
</script>