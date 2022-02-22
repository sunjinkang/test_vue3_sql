<template>
    <div>User</div>
</template>
<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue';
export default defineComponent({
    name: 'UserTable',
    setup() {
        const state = reactive({
            loginForm: {
                username: '',
                password: '',
            }
        });

        return {
            ...toRefs(state),
        }
    }
});
</script>