import * as signin from './signin';
import * as signup from './signup';
import { checkRequired, checkLength } from './validator';

// 创建模态框
function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('login', 'fade');
  modal.innerHTML = `<div class='login__box'>
                       ${signin.signinHtml}
                       ${signup.signupHtml}
                     </div>`;
  // 添加到 DOM 结构里
  document.body.appendChild(modal);
  return modal;
}

// 单例函数
function getSingle(fn) {
  let instance;
  return function() {
    return instance || (instance = fn());
  };
}

// 生成登陆模态框的闭包
const createSingleModal = getSingle(createModal);

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
function exit(e) {
  const login = document.querySelector('.login');
  if (e.target.classList.contains('login__exit')) {
    login.classList.remove('login--visible');
  }
}

// 模态框初始化
function initModal() {
  const signinBox = document.querySelector('.login__signin');
  const signupBox = document.querySelector('.login__signup');
  const formControls = document.querySelectorAll('.form-control');

  formControls.forEach(el => {
    const alertText = el.querySelector('p');
    el.classList.remove('form-error');
    alertText.innerText = '';
  });

  signinBox.classList.remove('hidden');
  signupBox.classList.add('hidden');
}

// 登录模态框事件处理
function modalHandler() {
  var loginBox = document.querySelector('.login__box');
  const signinForm = document.querySelector('.login__signin__form');
  const signupForm = document.querySelector('.login__signup__form');

  initModal();

  // 用户登录提交
  signinForm.addEventListener('submit', signin.validate);

  // 用户注册提交
  signupForm.addEventListener('submit', signup.validate);

  // 登陆注册栏切换
  loginBox.addEventListener('click', changeState);

  // 退出登陆框
  loginBox.addEventListener('click', exit);
}

// 创建单例模态框
function createSingleLoginModal() {
  // 返回模态框的实例
  const singleModal = createSingleModal();

  // 让模态框可见
  singleModal.classList.add('login--visible');
}

export { modalHandler, createSingleLoginModal };
