<template>
  <div>
    <p>用户管理</p>
    <p>
      你可以在这里管理平台的用户，用户只能看到或操作其已绑定的所有角色中包含的数据源。
    </p>
  </div>
  <user-table />
  <role-table />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import UserTable from './components/UserTable/index.vue';
import RoleTable from './components/RoleTable/index.vue';
export default defineComponent({
  components: { UserTable, RoleTable },
  setup() {
    const state = reactive({
      loginForm: {
        username: '',
        password: '',
      },
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
