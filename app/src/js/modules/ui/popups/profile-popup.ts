import profileHTMLCreator from '../../templates/profile-template';
import sync from '../../database/sync';
import clearPage from '../clear-page';
import { useVisitorDB } from '../../database/db-interface';
import changeUserPopup from '../../templates/change-username';
import changePassPopup from '../../templates/change-password';
import changeUsernameHandler from '../../profile/change-username';

class ProfilePopup {
  // 顶部显示用户图标
  showProfileIcon() {
    const loginBtn = document.querySelector('.site-header__login') as HTMLDivElement;
    const profile = document.querySelector('.site-header__profile') as HTMLDivElement;
    const profileName = profile.firstElementChild as HTMLSpanElement;
    const username = localStorage.getItem('User-name') as string;
    const capital = username.slice(0, 1).toUpperCase();

    profileName.innerText = capital;

    loginBtn.classList.add('hidden');
    profile.classList.remove('hidden');

    // 创建模态框;
    profile.addEventListener('click', this.initPopup);
  }

  // 创建模态框
  initPopup = () => {
    document.body.insertAdjacentHTML('beforeend', profileHTMLCreator());
    this.ProfileHandler();
  };

  // 事件处理中心
  ProfileHandler() {
    const profileCloser = document.querySelector('.profile-popup__utils__close') as HTMLSpanElement;
    const profileReturn = document.querySelector('.profile-popup__utils__return') as HTMLSpanElement;
    const logoutBtn = document.querySelector('.profile-popup__btn--logout') as HTMLButtonElement;
    const changeUserBtn = document.querySelector('.profile-popup__btn--change-username') as HTMLButtonElement;
    const changePassBtn = document.querySelector('.profile-popup__btn--change-password') as HTMLButtonElement;

    changeUserBtn.addEventListener('click', this.changeUsername);
    changePassBtn.addEventListener('click', this.changePassword);
    logoutBtn.addEventListener('click', this.logout);
    profileCloser.addEventListener('click', this.removeHTML);
    profileReturn.addEventListener('click', this.returnProfile);
  }

  // 修改用户名
  changeUsername = () => {
    const profilePopupContainer = document.querySelector('.profile-popup__container') as HTMLDivElement;
    const currProfileContent = document.querySelector('.profile-popup__content') as HTMLDivElement;

    this.showUtilReturn();
    currProfileContent.classList.add('hidden');
    profilePopupContainer.insertAdjacentHTML('beforeend', changeUserPopup);
    changeUsernameHandler();
  };

  // 修改密码
  changePassword = () => {
    const profilePopupContainer = document.querySelector('.profile-popup__container') as HTMLDivElement;
    const currProfileContent = document.querySelector('.profile-popup__content') as HTMLDivElement;

    this.showUtilReturn();
    currProfileContent.classList.add('hidden');
    profilePopupContainer.insertAdjacentHTML('beforeend', changePassPopup);
  };

  // 登出事件
  logout = () => {
    localStorage.removeItem('User-name');
    localStorage.removeItem('DB-name');
    localStorage.removeItem('CouchDB-auth');

    this.hideProfile();
    this.removeHTML();
    if (sync.syncHandler) {
      sync.syncHandler.cancel();
    }
    useVisitorDB();
    clearPage();
  };

  removeHTML() {
    const popup = document.querySelector('.profile-popup') as HTMLDivElement;
    document.body.removeChild(popup);
  }

  // 返回用户资料主界面
  returnProfile = () => {
    const profilePopupContainer = document.querySelector('.profile-popup__container') as HTMLDivElement;
    const currProfileContent = document.querySelector('.profile-popup__content') as HTMLDivElement;
    currProfileContent.classList.remove('hidden');

    const changeUserModule = document.querySelector('.profile-popup__change-username') as HTMLDivElement;
    const changePassModule = document.querySelector('.profile-popup__change-password') as HTMLDivElement;

    this.hideUtilReturn();
    if (changeUserModule) {
      return profilePopupContainer.removeChild(changeUserModule);
    }
    profilePopupContainer.removeChild(changePassModule);
  };

  // 显示返回图标
  showUtilReturn() {
    const returnBtn = document.querySelector('.profile-popup__utils__return') as HTMLSpanElement;
    returnBtn.classList.remove('hidden');
  }

  // 隐藏返回图标
  hideUtilReturn() {
    const returnBtn = document.querySelector('.profile-popup__utils__return') as HTMLSpanElement;
    returnBtn.classList.add('hidden');
  }

  hideProfile() {
    const loginBtn = document.querySelector('.site-header__login') as HTMLDivElement;
    const profile = document.querySelector('.site-header__profile') as HTMLDivElement;

    profile.classList.add('hidden');
    loginBtn.classList.remove('hidden');
  }
}

const profilePopup = new ProfilePopup();
export default profilePopup;
