// 加载数据库模块
import {backendDB as db} from "../BackendDB";

// 因为单一职责原则，把创建对象函数和形成单例的函数分开写
// 生成登陆模态框
const createLoginModal = () => {
  // 创建模态框
  const deleteModal = document.createElement('div');
  deleteModal.classList.add('login', 'fade');
  deleteModal.innerHTML = `<div class='login__box'>
                             <div class='login__signin'>
                               <p class='login__signin__welcome'>欢迎登陆PureTodo!</p>
                               <div class="login__signin__input">
                                 <input type="text" placeholder="用户名 / 邮箱"/>
                               </div>
                               <div class="login__signin__input">
                                 <input type="text" placeholder="密码"/>
                               </div>
                               <div class='login__signin__button'>
                                 <a class='login__signin__btn-yes'>登陆</a>
                               </div>
                               <div class="login__bottom">
                                 <a class="login__exit" href="# ">退出</a>
                                 <span>|</span>
                                 <a class="login__changeState" href="# ">注册新账号</a>
                               </div>
                             </div>

                             <div class='login__signup hidden'>
                               <p class='login__signup__welcome'>欢迎注册新账户!</p>
                               <div class="login__signup__input">
                                 <input type="text" placeholder="用户名 / 邮箱设置"/>
                               </div>
                               <div class="login__signup__input">
                                 <input type="text" placeholder="密码设置"/>
                               </div>
                               <div class='login__signup__button'>
                                 <a class='login__signup__btn-yes'>注册</a>
                               </div>
                               <div class="login__bottom">
                                 <a class="login__exit" href="# ">退出</a>
                                 <span>|</span>
                                 <a class="login__changeState" href="# ">返回登陆栏</a>
                               </div>
                             </div>
                           </div>`;
  // 添加到 DOM 结构里
  document.body.appendChild(deleteModal);
  return deleteModal;
};

// 单例函数
const getSingle = function(fn) {
  let instance
  return function() {
    return instance || (instance = fn());
  }
};

// 生成登陆模态框的闭包
const createSingleModal = getSingle(createLoginModal);

// 对外输出接口
const login = {
    // 创建单例模态框
  createSingleLoginModal() {
    // 生成模态框的实例
    const singleModal = createSingleModal();


    // 让模态框可见
    singleModal.classList.add('login--visible');
  },

  changeState(e) {
    const signin = document.querySelector('.login__signin');
    const signup = document.querySelector('.login__signup');
    if (e.target.classList.contains('login__changeState')) {
      signin.classList.toggle('hidden');
      signup.classList.toggle('hidden');
    }
  }
}



export {login};