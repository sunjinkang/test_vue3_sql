import { reactive, toRefs } from 'vue';
import roleService from '../../api/role';
import { ResponseCode } from '../../data/common';

const useRole = () => {
  let roleList = reactive({ list: [] });

  const updateRoleList = () => {
    roleService
      .getRoleTipListV1()
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          roleList.list = res.data?.data ?? [];
        } else {
          roleList.list = [];
        }
      })
      .catch(() => {
        roleList.list = [];
      });
  };

  return {
    ...toRefs(roleList),
    updateRoleList,
  };
};

export default useRole;
