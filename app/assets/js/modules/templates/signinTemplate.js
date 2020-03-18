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

export default signinHtml;
