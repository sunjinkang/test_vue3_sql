import { reactive, toRefs } from 'vue';
import { IUserGroupTipListItem } from '../../api/common';
import user_group from '../../api/user_group';
import { ResponseCode } from '../../data/common';

const useUserGroup = () => {
  let userGroupList = reactive({ group: [] as IUserGroupTipListItem[] });

  const updateUserGroupList = () => {
    user_group
      .getUserGroupTipListV1()
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          userGroupList.group = res.data?.data ?? [];
        } else {
          userGroupList.group = [];
        }
      })
      .catch(() => {
        userGroupList.group = [];
      });
  };

  return {
    ...toRefs(userGroupList),
    updateUserGroupList,
  };
};

export default useUserGroup;
