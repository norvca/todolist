// 加载数据库模块
import {backendDB as db} from "../BackendDB";

// 因为单一职责原则，把创建对象函数和形成单例的函数分开写
// 生成登陆模态框
const createLoginModal = () => {
  // 创建模态框
  const deleteModal = document.createElement("div");
  deleteModal.classList.add("login", "fade");
  deleteModal.innerHTML = `<div class='login__box'>
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
  document.body.appendChild(deleteModal);
  return deleteModal;
};

// 单例函数
const getSingle = function(fn) {
  let instance;
  return function() {
    return instance || (instance = fn());
  };
};

// 生成登陆模态框的闭包
const createSingleModal = getSingle(createLoginModal);

// 对外输出接口
const signin = {
  // 创建单例模态框
  createSingleLoginModal() {
    // 生成模态框的实例
    const singleModal = createSingleModal();


    // 让模态框可见
    singleModal.classList.add("login--visible");
  },

  // 提交注册按钮
  // signup(e) {

  // },

  // // 失焦验证是否合法
  // nameVertify(e) {
  //   if (e.target.classList.contains('signupUsername')) {
  //     const signupName = document.querySelector('.signupUsername');
  //     const signupPass = document.querySelector('.signupPassword');
  //     const signupName_error = document.querySelector('.signupUsername-error');

  //     if (signupName.value == "") {
  //       signupName.style.border = "1px solid #da635d";
  //       signupName_error.innerHTML = "用户名不能为空!";
  //       return false;
  //     } else if (signupName.value.length >= 16 || signupName.value.length <= 3) {
  //       signupName.style.border = "1px solid #da635d";
  //       signupName_error.innerHTML = "长度为4-16个字符";
  //       return false;
  //     } else {
  //       signupName.style.border = "1px solid #ccc";
  //       signupName_error.innerHTML = "";
  //     }
  //   }
  // },

  // 切换成注册功能
  changeState(e) {
    const signin = document.querySelector(".login__signin");
    const signup = document.querySelector(".login__signup");
    if (e.target.classList.contains("login__changeState")) {
      signin.classList.toggle("hidden");
      signup.classList.toggle("hidden");
    }
  },

  // 退出模态框
  exit(e) {
    const login = document.querySelector(".login");
    if (e.target.classList.contains("login__exit")) {
      login.classList.remove("login--visible");
    }
  }
};



export {signin};