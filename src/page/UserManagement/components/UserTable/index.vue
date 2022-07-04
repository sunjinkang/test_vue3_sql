<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="is_disabled" label="用户状态">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span :style="scope.row.is_disabled ? 'color:red' : ''">{{
              scope.row.is_disabled ? '异常' : '正常'
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="login_type" label="用户类型" />
      <el-table-column prop="role_name_list" label="角色">
        <template #default="scope">
          <div>
            <el-tag v-for="tag in scope.row.role_name_list ?? []" :key="tag">{{
              tag
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user_group_name_list" label="所属用户组">
        <template #default="scope">
          <div>
            <el-tag
              v-for="tag in scope.row.user_group_name_list ?? []"
              :key="tag"
              >{{ tag }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            编辑
          </el-button>
          <div v-if="scope.row.user_name !== 'admin'">
            <el-divider direction="vertical" />
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :title="`确定删除${scope.row.user_name}?`"
              @confirm="handleDelete(scope.row.user_name)"
            >
              <template #reference>
                <el-button>删除</el-button>
              </template>
            </el-popconfirm>
            <div v-if="scope.row.user_name !== 'admin'">
              <el-divider direction="vertical" />
              <el-dropdown
                @command="(command: string) => handleCommand(command, scope.row)"
              >
                <span class="el-dropdown-link">更多</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="modify"
                      >Action 1</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IUserResV1 } from '../../../../api/common';
import { ModalName } from '../../../../data/ModalName';
import { useUserManageStore } from '../../../../store/userManage';
import userService from '../../../../api/user';
import { ResponseCode } from '../../../../data/common';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'UserTable',
  props: ['tableData'],
  setup() {
    const useUserManage = useUserManageStore();

    const handleClick = (row: IUserResV1) => {
      useUserManage.updateSelectUser(row);
      useUserManage.updateModalStatus({
        modalName: ModalName.Update_User,
        status: true,
      });
    };

    const handleCommand = (command: string, row: IUserResV1) => {
      if (command === 'modify') {
        useUserManage.updateSelectUser(row);
        useUserManage.updateModalStatus({
          modalName: ModalName.Update_User_Password,
          status: true,
        });
      }
    };

    const handleDelete = (username: string) => {
      userService.deleteUserV1({ user_name: username }).then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          ElMessage({
            message: `删除用户${username}成功！`,
            type: 'success',
          });
          useUserManage.updateRefreshStatus();
        }
      });
    };

    return {
      handleClick,
      handleCommand,
      handleDelete,
    };
  },
});
</script>
