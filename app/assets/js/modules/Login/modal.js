import * as signin from './signin';
import { signup } from './signup';

// 创建模态框
function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('login', 'fade');
  modal.innerHTML = `<div class='login__box'>
                             <div class='login__signin'>
                               <p class='login__signin__welcome'>欢迎登陆PureTodo!</p>
                               <input class="login__signin__input" type="text" placeholder="用户名 / 邮箱"/>
                               <div class="signinUsername-error error"></div>
                               <input class="login__signin__input" type="text" placeholder="密码"/>
                               <div class="signinPassword-error error"></div>
                               <a class='login__signin__button'>登陆</a>
                               <div class="login__bottom">
                                 <a class="login__exit" href="# ">退出</a>
                                 <span>|</span>
                                 <a class="login__changeState" href="# ">注册新账号</a>
                               </div>
                             </div>

                             <div class='login__signup hidden'>
                               <p class='login__signup__welcome'>欢迎注册新账户!</p>
                               <input class="login__signup__input signupUsername" type="text" placeholder="用户名 / 邮箱设置"/>
                               <div class="signupUsername-error error"></div>
                               <input class="login__signup__input signupPassword" type="text" placeholder="密码设置"/>
                               <div class="signupPassword-error error"></div>
                               <a class='login__signup__button'>注册</a>
                               <div class="login__bottom">
                                 <a class="login__exit" href="# ">退出</a>
                                 <span>|</span>
                                 <a class="login__changeState" href="# ">返回登陆栏</a>
                               </div>
                             </div>
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

// 显示登录模态框
function showLoginModal() {
  var loginBox = document.querySelector('.login__box');
  // 登陆按钮提交
  loginBox.addEventListener('blur', signup.vertify, true);
  loginBox.addEventListener('click', signup.submit);

  // 登陆注册栏切换
  loginBox.addEventListener('click', signin.changeState);

  // 退出登陆框
  loginBox.addEventListener('click', signin.exit);
}

export { createSingleModal, showLoginModal };
