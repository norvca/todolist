// 切换成注册功能
function changeState(e) {
  const signin = document.querySelector('.login__signin');
  const signup = document.querySelector('.login__signup');
  if (e.target.classList.contains('login__changeState')) {
    signin.classList.toggle('hidden');
    signup.classList.toggle('hidden');
  }
}

// 退出模态框
function exit(e) {
  const login = document.querySelector('.login');
  if (e.target.classList.contains('login__exit')) {
    login.classList.remove('login--visible');
  }
}

export { changeState, exit };
