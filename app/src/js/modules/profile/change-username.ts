import axios from 'axios';
import api from '../api/urls';

// 事件处理中心
function changeUsernameHandler() {
  const changeUsernameForm = document.querySelector('.form__change-username');
  changeUsernameForm.addEventListener('submit', changeUsername);
}

// 修改用户名
function changeUsername(e) {
  const currentUsername = document.querySelector('.current-username');
  const newUsername = document.querySelector('.new-username');
  const welcome = document.querySelector('.profile-popup__welcome');
  e.preventDefault();

  axios
    .post(api.changeUsernameUrl, {
      currentUsername: currentUsername,
      newUsername: newUsername,
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

export default changeUsernameHandler;
