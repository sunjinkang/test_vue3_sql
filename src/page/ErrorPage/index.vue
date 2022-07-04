<template>
  <div>Error</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
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
