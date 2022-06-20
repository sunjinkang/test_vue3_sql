<template>
  <page-header title="用户管理" content="你可以在这里管理平台的用户，用户只能看到或操作其已绑定的所有角色中包含的数据源，和其所属的用户组所拥有的所有权限。" />
  <section class="padding-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户列表<el-button :icon="Refresh" plain @click="handleGetUserList" /></span>
          <el-button type="primary" @click="handleCreateUser">创建用户</el-button>
        </div>
      </template>
      <div>
        <SearchContent />
        <UserTable :tableData="tableData" />
      </div>
    </el-card>
    <AddUser :visible="visible" />
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import PageHeader from '../../components/PageHeader/index.vue';
import UserTable from './components/UserTable/index.vue';
import SearchContent from './components/SearchContent/index.vue';
import AddUser from './components/Modal/AddUser/index.vue';
import {
  Refresh
} from '@element-plus/icons-vue';
import UserService from '../../api/user/index';
export default defineComponent({
  components: { UserTable, PageHeader, SearchContent, AddUser },
  setup() {
    let state = reactive({
      tableData: [],
      visible: false
    });

    const handleGetUserList = () => {
      UserService.getUserListV1({
        page_index: 1,
        page_size: 10
      }).then((res) => {
        console.log(res.data);
        state.tableData = res.data?.data ?? [];
      })
    };

    const handleCreateUser = () => {
      state.visible = true;
    }

    onMounted(() => {
      handleGetUserList();
    });

    return {
      ...toRefs(state),
      Refresh,
      handleGetUserList,
      handleCreateUser
    };
  },
});
</script>
<style lang="less">
.padding-content {
  padding: 24px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      margin-left: 8px;
    }
  }
}
</style>
