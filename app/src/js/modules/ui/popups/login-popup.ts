import loginHTML from '../../templates/login-template';
import * as signin from '../../Login/Signin';
import * as signup from '../../Login/Signup';

class LoginPopup {
  createPopup() {
    document.body.insertAdjacentHTML('beforeend', loginHTML);
    this.initPopup();
  }

  initPopup() {
    const signinBox = document.querySelector('.login__signin') as HTMLDivElement;
    const signupBox = document.querySelector('.login__signup') as HTMLDivElement;
    const formControls = document.querySelectorAll('.form-control') as NodeListOf<HTMLDivElement>;
    const welcome = document.querySelector('.login__signin__welcome') as HTMLParagraphElement;

    formControls.forEach(el => {
      const input = el.querySelector('input') as HTMLInputElement;
      const alertText = el.querySelector('p') as HTMLParagraphElement;

      input.value = '';
      el.classList.remove('form-error');
      alertText.innerText = '';
    });

    signinBox.classList.remove('hidden');
    signupBox.classList.add('hidden');

    welcome.innerText = '欢迎登陆PureTodo!';
    welcome.classList.remove('error');

    this.loginHandler();
  }

  loginHandler() {
    const loginBox = document.querySelector('.login__box') as HTMLDivElement;
    const signinForm = document.querySelector('.login__signin__form') as HTMLFormElement;
    const signupForm = document.querySelector('.login__signup__form') as HTMLFormElement;
    const signinExitBtn = document.querySelector('.login__signin__exit') as HTMLAnchorElement;
    const signupExitBtn = document.querySelector('.login__signup__exit') as HTMLAnchorElement;

    // 用户登录提交
    signinForm.addEventListener('submit', signin.checkAndSubmit);

    // 用户注册提交
    signupForm.addEventListener('submit', signup.checkAndSubmit);

    // 登录注册功能切换
    loginBox.addEventListener('click', this.changeState);

    // 删除模态框
    signinExitBtn.addEventListener('click', this.exit);
    signupExitBtn.addEventListener('click', this.exit);
  }

  changeState(e: MouseEvent) {
    const signin = document.querySelector('.login__signin') as HTMLDivElement;
    const signup = document.querySelector('.login__signup') as HTMLDivElement;
    const target = e.target as HTMLAnchorElement;

    if (target.classList.contains('login__changeState')) {
      signin.classList.toggle('hidden');
      signup.classList.toggle('hidden');
    }
  }

  exit() {
    const loginModal = document.querySelector('.login') as HTMLDivElement;
    loginModal.remove();
  }
}

const loginPopup = new LoginPopup();
export default loginPopup;
