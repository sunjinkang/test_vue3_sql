<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column prop="user_name" label="用户名" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="is_disabled" label="用户状态">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span :style="scope.row.is_disabled ? 'color:red' : ''">{{ scope.row.is_disabled ? '异常' : '正常' }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="login_type" label="用户类型" />
            <el-table-column prop="role_name_list" label="角色" >
                <template #default="scope">
                    <div>
                        <el-tag v-for="tag in scope.row.role_name_list ?? []" key={tag}>{tag}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="user_group_name_list" label="所属用户组" >
                <template #default="scope">
                    <div>
                        <el-tag v-for="tag in scope.row.user_group_name_list ?? []" key={tag}>{tag}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button type="text" size="small" @click="handleClick">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue';
export default defineComponent({
    name: 'UserTable',
    props: ['tableData'],
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