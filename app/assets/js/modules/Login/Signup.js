import axios from 'axios';
import {
  checkLength,
  checkRequired,
  checkEmail,
  checkPasswordMatch,
  checkusername,
  checkpassword,
} from './validator';

const validate = e => {
  const signupForm = document.querySelector('.login__signup__form');
  const username = signupForm.querySelector('.username');
  const password = signupForm.querySelector('.password');
  const confirmPassword = signupForm.querySelector('.confirmPassword');
  const email = signupForm.querySelector('.email');
  e.preventDefault();

  checkRequired([username, password, confirmPassword, email]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
  checkusername(username);
  checkpassword(password);

  submitInfo(username.value, password.value, email.value);
};

// 提交信息到服务端
function submitInfo(username, password, email) {
  const signupBox = document.querySelector('.login__signup');
  const formControls = signupBox.querySelectorAll('.form-control');
  const welcome = signupBox.querySelector('.login__signup__welcome');
  const list = Array.from(formControls);

  // 检查前端输入是否全部通过
  const isSubmit = list.every(el => {
    return !el.classList.contains('form-error');
  });

  // 前端通过则提交到服务端
  if (isSubmit) {
    axios
      .post('http://192.168.206.140:3000/api/user/register', {
        username: username,
        password: password,
        email: email,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        welcome.innerText = '用户名已存在！';
        welcome.classList.add('error');
        console.log(err.response.data);
      });
  }
}

export {validate};
