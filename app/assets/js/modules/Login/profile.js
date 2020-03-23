function showProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');

  loginBtn.classList.add('hidden');
  profile.classList.remove('hidden');
}

function hideProfile() {
  const loginBtn = document.querySelector('.site-header__login');
  const profile = document.querySelector('.site-header__profile');

  profile.classList.add('hidden');
  loginBtn.classList.remove('hidden');
}

export { showProfile, hideProfile };
