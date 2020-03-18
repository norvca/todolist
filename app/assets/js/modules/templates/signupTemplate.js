const signupHtml = `<div class="login__signup hidden">
      <p class="login__signup__welcome">欢迎注册新账户!</p>
      <form class="login__signup__form">
        <div class="form-control">
          <input
            class="username login__signup__input"
            name="username"
            type="text"
            placeholder="用户名"
          />
          <p></p>
        </div>
        <div class="form-control">
          <input
            class="email login__signup__input"
            name="email"
            type="text"
            placeholder="邮箱"
          />
          <p></p>
        </div>
        
        <div class="form-control">
          <input
            class="password login__signup__input"
            name="password"
            type="password"
            placeholder="密码"
          />
          <p></p>
        </div>

        <div class="form-control">
          <input
            class="confirmPassword login__signup__input"
            name="confirmPassword"
            type="password"
            placeholder="确认密码"
          />
          <p></p>
        </div>

        <button class='login__signup__button' type="submit">注册</button>
      </form>
      <div class="login__bottom">
        <a class="login__exit" href="# ">退出</a>
        <span>|</span>
        <a class="login__changeState" href="# ">返回登陆栏</a>
      </div>
    </div>`;

export default signupHtml;
