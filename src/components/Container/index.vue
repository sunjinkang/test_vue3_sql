<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <div class="menu-icon">
            <img src="../../assets/logo.png" alt="" />
            SQLE
          </div>
          <Menu />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Header from './components/Header/index.vue';
import Menu from './components/Menu/index.vue';
import { defineComponent, onMounted, reactive, watch } from 'vue';
import user from '../../api/user';
import { useUserStore } from '../../store/user';
export default defineComponent({
  name: 'Container',
  components: {
    Header,
    Menu,
  },
  // setup() {
  //   const getUserInfo = () => {
  //     user.getCurrentUserV1().then((res) => {
  //       console.log(res);
  //     });
  //   }

  //   onMounted(() => {
  //     const userStore = useUserStore();
  //     console.log(userStore);
  //     const tokenData = reactive({
  //       token: userStore.token
  //     });
  
  //     watch(tokenData, () => {
  //       getUserInfo();
  //     });
  //   });

  // }
});
</script>
<style lang="less">
.el-container {
  height: 100vh;
  .el-header {
    border-bottom: 1px solid lightgrey;
    height: 40px;
    line-height: 40px;
  }
  .el-scrollbar__view{
    height: 100%;
  }
  .menu-icon {
    background-color: #001529;
    height: 60px;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
  .el-main {
    padding: 0;
    background-color: #f0f2f5;
  }
}
</style>
