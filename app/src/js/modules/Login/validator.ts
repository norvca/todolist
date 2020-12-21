// 检查是否存在
function checkRequired(inputArr: HTMLInputElement[]): void {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${input.placeholder}不能为空`);
    } else {
      showSuccess(input);
    }
  });
}

// 检查输入字符长度
function checkLength(input: HTMLInputElement, min: number, max: number): void {
  const length = input.value.trim().length;

  if (length < min) {
    showError(input, `${input.placeholder}长度至少为${min}个字符`);
  } else if (length > max) {
    showError(input, `${input.placeholder}长度不超过${max}个字符`);
  } else {
    showSuccess(input);
  }
}

// 检查邮件格式
function checkEmail(input: HTMLInputElement): void {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `请输入正确的${input.placeholder}格式`);
  }
}

// 检查密码是否输入相同
function checkPasswordMatch(input1: HTMLInputElement, input2: HTMLInputElement): void {
  if (input1.value !== input2.value) {
    showError(input2, `两次输入的密码不一致`);
  }
}

// 检查用户名格式
function checkUsername(input: HTMLInputElement): void {
  const re = /^[a-zA-Z]+[a-zA-Z0-9]*$/;

  if (!re.test(input.value.trim())) {
    showError(input, `${input.placeholder}开头必须为字母，全称只能包含字母、数字`);
  }
}

// 检查密码格式
function checkPassword(input: HTMLInputElement): void {
  const re = /^([a-zA-Z0-9]+[a-zA-Z0-9~!@#$%^&*()_+-=])*$/;

  if (!re.test(input.value.trim())) {
    showError(input, `${input.placeholder}开头必须为字母或数字，全称只能包含字母、数字、和常见字符`);
  }
}

function showError(input: HTMLInputElement, message: string) {
  const formControl = input.parentElement as HTMLDivElement;
  if (formControl.classList.contains('form-error')) return;
  formControl.className = 'form-control form-error';

  const p = formControl.querySelector('p') as HTMLParagraphElement;
  p.innerText = message;
}

function showSuccess(input: HTMLInputElement) {
  const formControl = input.parentElement as HTMLDivElement;
  formControl.className = 'form-control';

  const p = formControl.querySelector('p') as HTMLParagraphElement;
  p.innerText = '';
}

export { checkLength, checkRequired, checkEmail, checkPasswordMatch, checkUsername, checkPassword };
