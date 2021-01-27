// 同步数据前经过的 proxy 服务器
import { IUrls } from '../interfaces/IUrls';

const api: IUrls = {
  syncUrl: 'http://192.168.229.130:4000',
  signInUrl: 'http://192.168.229.130:3000/api/user/login',
  registerUrl: 'http://192.168.229.130:3000/api/user/register',
  changeUsernameUrl: 'http://192.168.229.130:4000/api/user/changeUsername',
};

export default api;
