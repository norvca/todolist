import loginHTML from '../../templates/login-template';
import * as signin from '../../Login/Signin';
import * as signup from '../../Login/Signup';

// 创建模态框
function createHtml() {
  document.body.insertAdjacentHTML('beforeend', loginHTML);
  initPopup();
}

// 模态框初始化
function initPopup() {
  const signinBox = document.querySelector('.login__signin');
  const signupBox = document.querySelector('.login__signup');
  const formControls = document.querySelectorAll('.form-control');
  const welcome = document.querySelector('.login__signin__welcome');

  formControls.forEach(el => {
    const input = el.querySelector('input');
    const alertText = el.querySelector('p');

    input.value = '';
    el.classList.remove('form-error');
    alertText.innerText = '';
  });

  signinBox.classList.remove('hidden');
  signupBox.classList.add('hidden');

  welcome.innerText = '欢迎登陆PureTodo!';
  welcome.classList.remove('error');

  loginHandler();
}

// 事件处理中心
function loginHandler() {
  var loginBox = document.querySelector('.login__box');
  const signinForm = document.querySelector('.login__signin__form');
  const signupForm = document.querySelector('.login__signup__form');
  const signinExitBtn = document.querySelector('.login__signin__exit');
  const signupExitBtn = document.querySelector('.login__signup__exit');

  // 用户登录提交
  signinForm.addEventListener('submit', signin.checkAndSubmit);

  // 用户注册提交
  signupForm.addEventListener('submit', signup.checkAndSubmit);

  // 登录注册功能切换
  loginBox.addEventListener('click', changeState);

  // 删除模态框
  signinExitBtn.addEventListener('click', exit);
  signupExitBtn.addEventListener('click', exit);
}

// 登录注册功能切换
function changeState(e) {
  const signin = document.querySelector('.login__signin');
  const signup = document.querySelector('.login__signup');
  if (e.target.classList.contains('login__changeState')) {
    signin.classList.toggle('hidden');
    signup.classList.toggle('hidden');
  }
}

// 删除模态框
function exit() {
  const login = document.querySelector('.login');
  login.remove();
}

export {exit, createHtml};
