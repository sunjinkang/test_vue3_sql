import axios from 'axios';
import { useUserStore } from '../store/user';
import { createBrowserHistory } from 'history';
import { ResponseCode } from '../data/common';
import Download from './Download';
import { ElNotification } from 'element-plus';

const ApiBase = axios.create();

const authInvalid = () => {
  const userStore = useUserStore();
  userStore.updateUser({ username: '', role: '' });
  userStore.updateToken('');
  const history = createBrowserHistory();
  history.push('/login');
};

ApiBase.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      authInvalid();
    } else if (res.headers?.['content-disposition']?.includes('attachment')) {
      const disposition: string = res.headers?.['content-disposition'];
      const flag = 'filename=';
      const flagCharset = 'filename*=';
      let filename = '';
      if (disposition.includes(flagCharset)) {
        const tempArr = disposition.split("'");
        filename = decodeURI(tempArr[tempArr.length - 1]);
      } else {
        const startIndex = disposition.indexOf(flag);
        filename = disposition.slice(startIndex + flag.length);
      }
      Download.downloadByCreateElementA(res.data, filename);
      return res;
    } else if (
      (res.status === 200 && res?.data?.code !== ResponseCode.SUCCESS) ||
      res.status !== 200
    ) {
      ElNotification({
        title: '错误',
        message: res?.data?.message ?? '未知',
        type: 'error',
      });
    }
    return res;
  },
  (error) => {
    if (error?.response?.status === 401) {
      authInvalid();
    } else if (error?.response?.status !== 200) {
      const response = error?.response;
      ElNotification({
        title: '错误',
        message: response?.data?.message ?? response?.statusText ?? '未知',
        type: 'error',
      });
    }
    return Promise.reject(error);
  }
);

const doNotAddAuthRequest = ['/login'];

ApiBase.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (doNotAddAuthRequest.some((url) => config.url?.includes(url))) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: userStore.$state.token,
    },
  };
});

export default ApiBase;
