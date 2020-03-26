import signinHtml from '../templates/signinTemplate';
import signupHtml from '../templates/signupTemplate';
import loginHandler from './login-handler';

// 创建登录模态框
function createHtml() {
  const modal = document.createElement('div');
  modal.classList.add('login', 'fade');
  modal.innerHTML = `<div class='login__box'>
                       ${signinHtml}
                       ${signupHtml}
                     </div>`;
  // const modalHTML = `<div clas="login fade">
  //                     <div clas="login_box">
  //                       ${signinHtml}
  //                       ${signupHtml}
  //                     </div>
  //                   </div>`;

  // 添加到 DOM 结构里
  document.body.appendChild(modal);
  return modal;
}

// 单例函数
function getSingle(fn) {
  let instance;
  return function () {
    return instance || (instance = fn());
  };
}

// 生成登陆模态框的闭包
const createSingleModal = getSingle(createHtml);

// 切换成注册功能
function changeState(e) {
  const signin = document.querySelector('.login__signin');
  const signup = document.querySelector('.login__signup');
  if (e.target.classList.contains('login__changeState')) {
    signin.classList.toggle('hidden');
    signup.classList.toggle('hidden');
  }
}

// 退出模态框
function exit() {
  const login = document.querySelector('.login');
  login.classList.remove('login--visible');
}

// 模态框初始化
function initModal() {
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
}

// 创建单例模态框
function showModal() {
  // 返回模态框的实例
  const singleModal = createSingleModal();

  // 让模态框可见
  singleModal.classList.add('login--visible');

  // 注册模态框事件
  loginHandler();
}

export {exit, changeState, initModal, showModal};
