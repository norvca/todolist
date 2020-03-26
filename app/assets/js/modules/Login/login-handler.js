import * as loginModal from './login-popup';
import * as signin from './signin';
import * as signup from './signup';

// 登录模态框事件处理
function modalHandler() {
  var loginBox = document.querySelector('.login__box');
  const signinForm = document.querySelector('.login__signin__form');
  const signupForm = document.querySelector('.login__signup__form');
  const signinExitBtn = document.querySelector('.login__signin__exit');
  const signupExitBtn = document.querySelector('.login__signup__exit');

  loginModal.initModal();

  // 用户登录提交
  signinForm.addEventListener('submit', signin.validate);

  // 用户注册提交
  signupForm.addEventListener('submit', signup.validate);

  // 登陆注册栏切换
  loginBox.addEventListener('click', loginModal.changeState);

  // 退出登陆框
  signinExitBtn.addEventListener('click', loginModal.exit);
  signupExitBtn.addEventListener('click', loginModal.exit);
}

export default modalHandler;
