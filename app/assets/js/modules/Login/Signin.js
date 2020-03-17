import {
  checkLength,
  checkRequired,
  checkusername,
  checkpassword
} from './validator';

const signinHtml = `<div class="login__signin">
      <p class="login__signin__welcome">欢迎登陆PureTodo!</p>
      <form class="login__signin__form">
        <div class="form-control">
          <input
            class="username login__signin__input"
            name="username"
            type="text"
            placeholder="用户名"
          />
          <p></p>
        </div>
        <div class="form-control">
          <input
            class="password login__signin__input"
            name="password"
            type="password"
            placeholder="密码"
          />
          <p></p>
        </div>
        <button class='login__signin__button' type="submit">登录</button>
      </form>
      <div class="login__bottom">
        <a class="login__exit" href="# ">退出</a>
        <span>|</span>
        <a class="login__changeState" href="# ">注册新账号</a>
      </div>
    </div>`;

const validate = e => {
  const signinForm = document.querySelector('.login__signin__form');
  const username = signinForm.querySelector('.username');
  const password = signinForm.querySelector('.password');
  e.preventDefault();

  checkRequired([username, password]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 25);
  checkusername(username);
  checkpassword(password);
};

export { signinHtml, validate };
