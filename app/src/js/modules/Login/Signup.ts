import axios from 'axios';
import { checkLength, checkRequired, checkEmail, checkPasswordMatch, checkusername, checkpassword } from './validator';
import api from '../api/urls';
import loginPopup from '../ui/popups/login-popup';

function checkAndSubmit(e: MouseEvent): void {
  e.preventDefault();
  const signupForm = document.querySelector('.login__signup__form') as HTMLFormElement;
  const username = signupForm.querySelector('.username') as HTMLInputElement;
  const password = signupForm.querySelector('.password') as HTMLInputElement;
  const confirmPassword = signupForm.querySelector('.confirmPassword') as HTMLInputElement;
  const email = signupForm.querySelector('.email') as HTMLInputElement;

  const isCheckPassed = validate(username, password, confirmPassword, email);
  if (isCheckPassed) {
    submitInfo(username.value, password.value, email.value);
  }
}

function validate(
  username: HTMLInputElement,
  password: HTMLInputElement,
  confirmPassword: HTMLInputElement,
  email: HTMLInputElement,
) {
  const formControls = document.querySelectorAll('.login__signup .form-control') as NodeListOf<HTMLDivElement>;
  const list = Array.from(formControls);

  checkRequired([username, password, confirmPassword, email]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
  checkusername(username);
  checkpassword(password);

  // 检查前端输入是否全部通过
  const isCheckPassed = list.every(el => {
    return !el.classList.contains('form-error');
  });

  return isCheckPassed;
}

// 提交信息到服务端
function submitInfo(username: string, password: string, email: string) {
  axios
    .post(api.registerUrl, {
      username: username,
      password: password,
      email: email,
    })
    .then(res => {
      setSuccessInfo('注册成功！');
      loginPopup.exit();
      console.log(res.data);
    })
    .catch(err => {
      setErrorInfo('用户名已存在！');
      console.log(err.response.data);
    });
}

function setSuccessInfo(info: string) {
  const welcome = document.querySelector('.login__signup .login__signup__welcome') as HTMLParagraphElement;
  welcome.innerText = info;
  welcome.classList.remove('error');
}

function setErrorInfo(info: string) {
  const welcome = document.querySelector('.login__signup .login__signup__welcome') as HTMLParagraphElement;
  welcome.innerText = info;
  welcome.classList.add('error');
}

export { checkAndSubmit };
