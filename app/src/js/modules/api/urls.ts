// 同步数据前经过的 proxy 服务器
import { IUrls } from '../interfaces/IUrls';
const BACKEND_URL = '192.168.229.133';

const api: IUrls = {
  syncUrl: `http://${BACKEND_URL}:4000`,
  signInUrl: `http://${BACKEND_URL}:3000/api/user/login`,
  registerUrl: `http://${BACKEND_URL}:3000/api/user/register`,
  changeUsernameUrl: `http://${BACKEND_URL}:4000/api/user/changeUsername`,
};

export default api;
