import axios from 'axios';
import {
  checkLength,
  checkRequired,
  checkusername,
  checkpassword
} from './validator';
import { userDB } from '../database/pouchDB';
import * as loginModal from './modal';
import { hexedDBame } from '../utils/hex-encode';
import { initApp } from '../utils/app-init';

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

  submitInfo(username.value, password.value);
};

// 提交信息到服务端
function submitInfo(username, password) {
  const signinBox = document.querySelector('.login__signin');
  const formControls = signinBox.querySelectorAll('.form-control');
  const welcome = signinBox.querySelector('.login__signin__welcome');
  const list = Array.from(formControls);

  // 检查前端输入是否全部通过
  const isSubmit = list.every(el => {
    return !el.classList.contains('form-error');
  });

  // 前端通过则提交到服务端
  if (isSubmit) {
    axios
      .post('http://192.168.206.141:3000/api/user/login', {
        username: username,
        password: password
      })
      .then(response => {
        const token = response.data.token;
        const dbName = hexedDBame(username);

        localStorage.setItem('CouchDB-auth', token);
        localStorage.setItem('User-name', username);
        localStorage.setItem('DB-name', dbName);
        welcome.innerText = '登录成功！';
        welcome.classList.remove('error');
        loginModal.exit();

        initApp(username, token);

        console.log('Sync success!');
      })
      .catch(err => {
        welcome.innerText = '用户名或密码错误！';
        welcome.classList.add('error');
        console.log(err.response);
      });
  }
}

export { validate };
