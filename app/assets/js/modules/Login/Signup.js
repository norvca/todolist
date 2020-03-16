// 加载数据库模块
import { backendDB as db } from '../backendDB';

const signup = {
  vertify(e) {
    const target = e.target;
    const reg = /(^\s+)|(\s+$)/g;
    // 注册验证
    if (target.classList.contains('signupUsername')) {
      const signupName = document.querySelector('.signupUsername');
      const signupName_error = document.querySelector('.signupUsername-error');

      // 账户名不能为空
      if (signupName.value == '') {
        signupName.style.border = '1px solid #da635d';
        signupName_error.innerHTML = '用户名不能为空';
        return false;

        // 不能包含空格
      } else if (reg.test(signupName.value)) {
        signupName.style.border = '1px solid #da635d';
        signupName_error.innerHTML = '不能包含空格';
        return false;

        // 账户名字数在4-16区间
      } else if (
        signupName.value.length >= 16 ||
        signupName.value.length <= 3
      ) {
        signupName.style.border = '1px solid #da635d';
        signupName_error.innerHTML = '长度为4-16个字符';
        return false;
      } else {
        signupName.style.border = '1px solid #ccc';
        signupName_error.innerHTML = '';
      }
    } else if (target.classList.contains('signupPassword')) {
      const signupPass = document.querySelector('.signupPassword');
      const signupPass_error = document.querySelector('.signupPassword-error');

      // 密码不能为空
      if (signupPass.value == '') {
        signupPass.style.border = '1px solid #da635d';
        signupPass_error.innerHTML = '密码不能为空';
        return false;

        // 不能包含空格
      } else if (reg.test(signupPass.value)) {
        signupPass.style.border = '1px solid #da635d';
        signupPass_error.innerHTML = '不能包含空格';
        return false;

        // 账户名字数在4-16区间
      } else if (
        signupPass.value.length >= 16 ||
        signupPass.value.length <= 3
      ) {
        signupPass.style.border = '1px solid #da635d';
        signupPass_error.innerHTML = '长度为4-16个字符';
        return false;
      } else {
        signupPass.style.border = '1px solid #ccc';
        signupPass_error.innerHTML = '';
      }
    }
  }
};

export { signup };
