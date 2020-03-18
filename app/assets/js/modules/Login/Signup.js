import {
  checkLength,
  checkRequired,
  checkEmail,
  checkPasswordMatch,
  checkusername,
  checkpassword
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
};

export { validate };
