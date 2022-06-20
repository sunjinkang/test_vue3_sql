<template>
  <UserForm :dialogVisible="visible" :isUpdate="false" :isAdmin="isAdmin" @handleGetData="handleGetData" />
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import UserForm from '../UserForm/index.vue';
import { useUserStore } from '../../../../../store/user';
import { SystemRole } from '../../../../../data/common';
export default defineComponent({
  name: 'AddUser',
  components: { UserForm },
  props: ['visible'],
  setup() {
    const userStore = useUserStore();
    const user = reactive({
      isAdmin: userStore.role === SystemRole.admin
    });

    const handleGetData = (data: any) => {
      console.log(data);
    };

    return {
      ...toRefs(user),
      handleGetData
    };
  },
});
</script>
