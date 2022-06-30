<template>
  <div class="header-top">
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><user /></el-icon>
          {{userStore?.username}}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <el-icon><switch-button /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="question">
      <el-icon><question-filled /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '../../../../store/user';
import { User, SwitchButton, QuestionFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const logout = () => {
  userStore.updateToken('');
  userStore.updateUser({ username: '', role: '' });
  router.push('/');
}
</script>
<style lang="less">
.header-top {
  height: 40px;
  line-height: 40px;
  text-align: right;
  display: flex;
  justify-content: end;
  .el-dropdown {
    height: 40px;
    line-height: 40px;
  }
  .question {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}
</style>