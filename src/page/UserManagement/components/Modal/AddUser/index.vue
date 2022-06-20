<template>
  <UserForm :dialogVisible="visible" :userFormRef="userFormRef" :isUpdate="false" :isAdmin="isAdmin" @handleGetData="handleGetData" />
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import UserForm from '../UserForm/index.vue';
import type { ElForm } from 'element-plus';
import { useUserStore } from '../../../../../store/user';
import { SystemRole } from '../../../../../data/common';
export default defineComponent({
  name: 'AddUser',
  components: { UserForm },
  props: ['visible'],
  setup() {
    type FormInstance = InstanceType<typeof ElForm>;
    const userFormRef = ref<FormInstance>();
    const userStore = useUserStore();
    const user = reactive({
      isAdmin: userStore.role === SystemRole.admin
    });

    const handleGetData = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        }
      })
    };

    return {
      ...toRefs(user),
      userFormRef,
      handleGetData
    };
  },
});
</script>
