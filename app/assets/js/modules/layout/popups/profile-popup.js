import profileHTMLCreater from '../../templates/profile-template';
import {syncHandler} from '../../database/sync';
import helperFunction from '../../utils/helper-function';
import {useVisitorDB} from '../../utils/db-interface';

// 顶部显示用户图标
function showProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');
  const username = localStorage.getItem('User-name');
  const capital = username.slice(0, 1).toUpperCase();

  profile.firstElementChild.innerText = capital;

  loginBtn.classList.add('hidden');
  profile.classList.remove('hidden');

  profile.addEventListener('click', createHTML);
}

// 创建用户信息模态框
function createHTML() {
  document.body.insertAdjacentHTML('beforeend', profileHTMLCreater());

  ProfileHandler();
}

// 事件处理中心
function ProfileHandler() {
  const profileCloser = document.querySelector('.profile-popup__close');
  const logoutBtn = document.querySelector('.profile-popup__btn--logout');

  profileCloser.addEventListener('click', removeHTML);
  logoutBtn.addEventListener('click', logout);
}

// 登出事件
function logout() {
  localStorage.removeItem('User-name');
  localStorage.removeItem('DB-name');
  localStorage.removeItem('CouchDB-auth');

  hideProfile();
  removeHTML();
  syncHandler.cancel();
  useVisitorDB();
  helperFunction.freshPage();
}

function removeHTML() {
  const popup = document.querySelector('.profile-popup');
  document.body.removeChild(popup);
}

function hideProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');

  profile.classList.add('hidden');
  loginBtn.classList.remove('hidden');
}

export {showProfile, hideProfile};
