// 同步数据前经过的 proxy 服务器

const api = {
  syncUrl: 'http://192.168.71.129:4000',
  signinUrl: 'http://192.168.71.129:3000/api/user/login',
  registerUrl: 'http://192.168.71.129:3000/api/user/register',
  changeUsernameUrl: 'http://192.168.71.129:4000/api/user/changeUsername',
};

export default api;
