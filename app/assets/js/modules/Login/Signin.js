import {
  checkLength,
  checkRequired,
  checkusername,
  checkpassword
} from './validator';

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
};

export { validate };
