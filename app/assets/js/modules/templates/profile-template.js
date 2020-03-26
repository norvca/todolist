export default function profileTemplate() {
  const username = localStorage.getItem('User-name');

  const profileHTML = `<div class="popup fade">
                      <b class="popup__container">
                        <span class="popup__close close">X</span>
                        <div class="popup__content">
                          <h2>你好，${username}！</span></h2>
                          <button class="button">修改用户名</button>
                          <button class="button">修改密码</button>
                          <button class="button button--logout">登出</button>
                        </divc>
                      </div>
                    </div>`;

  const fragement = document
    .createRange()
    .createContextualFragment(profileHTML);

  return fragement;
}
