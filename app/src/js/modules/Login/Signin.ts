import axios from 'axios';
import { checkLength, checkRequired, checkusername, checkpassword } from './validator';
import loginPopup from '../ui/popups/login-popup';
import { hexedDBName } from '../utils/hex-encode';
import { initApp } from '../utils/app-init';
import api from '../api/urls';

function checkAndSubmit(e: MouseEvent): void {
  e.preventDefault();
  const username = document.querySelector('.login__signin__form .username') as HTMLInputElement;
  const password = document.querySelector('.login__signin__form .password') as HTMLInputElement;

  const isCheckPassed = validate(username, password);
  if (isCheckPassed) {
    submitInfo(username.value, password.value);
  }
}

function validate(username: HTMLInputElement, password: HTMLInputElement) {
  const formControls = document.querySelectorAll('.login__signin .form-control') as NodeListOf<HTMLDivElement>;
  const list = Array.from(formControls);

  checkRequired([username, password]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 25);
  checkusername(username);
  checkpassword(password);

  // 检查前端输入是否全部通过
  const isCheckPassed = list.every(el => {
    return !el.classList.contains('form-error');
  });

  return isCheckPassed;
}

// 提交信息到服务端
function submitInfo(username: string, password: string) {
  axios
    .post(api.signinUrl, {
      username: username,
      password: password,
    })
    .then(response => {
      console.log(response);
      const token = response.data.token;
      const dbName = hexedDBName(username);

      setSuccessInfo('登录成功！');
      loginPopup.exit();
      setLocalStorage(username, dbName, token);
      initApp(username, token);
      console.log('Sync success!');
    })
    .catch(err => {
      setErrorInfo('用户名或密码错误！');
      console.log(err.response);
    });
}

function setLocalStorage(username: string, dbName: string, token: string) {
  localStorage.setItem('CouchDB-auth', token);
  localStorage.setItem('User-name', username);
  localStorage.setItem('DB-name', dbName);
}

function setSuccessInfo(info: string) {
  const welcome = document.querySelector('.login__signin .login__signin__welcome') as HTMLParagraphElement;
  welcome.innerText = info;
  welcome.classList.remove('error');
}

function setErrorInfo(info: string) {
  const welcome = document.querySelector('.login__signin .login__signin__welcome') as HTMLParagraphElement;
  welcome.innerText = info;
  welcome.classList.add('error');
}

export { checkAndSubmit };
