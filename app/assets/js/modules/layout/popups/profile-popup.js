import profileTemplate from '../../templates/profile-template';

function ProfileHandler() {
  const profileIcon = document.querySelector('.site-header__profile');

  profileIcon.addEventListener('click', createHTML);
}

function createHTML() {
  document.body.appendChild(profileTemplate());

  const profileCloser = document.querySelector('.popup__close');
  profileCloser.addEventListener('click', removeHTML);
}

function removeHTML() {
  const popup = document.querySelector('.popup');
  document.body.removeChild(popup);
}

function showProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');
  const username = localStorage.getItem('User-name');
  const capital = username.slice(0, 1).toUpperCase();

  profile.firstElementChild.innerText = capital;

  loginBtn.classList.add('hidden');
  profile.classList.remove('hidden');

  ProfileHandler();
}

function hideProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');

  profile.classList.add('hidden');
  loginBtn.classList.remove('hidden');
}

export {showProfile, hideProfile};
