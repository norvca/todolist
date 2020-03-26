import * as loginPopup from '../layout/popups/login-popup';
import * as signin from './signin';
import * as signup from './signup';

// 登录模态框事件处理
function modalHandler() {
  var loginBox = document.querySelector('.login__box');
  const signinForm = document.querySelector('.login__signin__form');
  const signupForm = document.querySelector('.login__signup__form');
  const signinExitBtn = document.querySelector('.login__signin__exit');
  const signupExitBtn = document.querySelector('.login__signup__exit');

  loginPopup.initModal();

  // 用户登录提交
  signinForm.addEventListener('submit', signin.validate);

  // 用户注册提交
  signupForm.addEventListener('submit', signup.validate);

  // 登陆注册栏切换
  loginBox.addEventListener('click', loginPopup.changeState);

  // 退出登陆框
  signinExitBtn.addEventListener('click', loginPopup.exit);
  signupExitBtn.addEventListener('click', loginPopup.exit);
}

export default modalHandler;
