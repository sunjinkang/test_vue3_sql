<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import user from './api/user';
import { ResponseCode, SystemRole } from './data/common';
import { useUserStore } from './store/user';
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const tokenData = reactive({
      token: ''
    });

    const clearUserInfo = () => {
      userStore.updateUser({
        username: '',
        role: '',
      });
      userStore.updateToken('');
    };

    const getUserInfo = () => {
      user.getCurrentUserV1().then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          const data = res.data.data;
          userStore.updateUser({
            username: data?.user_name ?? '',
            role: data?.is_admin ? SystemRole.admin : '',
          });
        } else {
          clearUserInfo();
        }
      });
    }

    getUserInfo();
  }
});

</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
</style>
