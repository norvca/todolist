function profileHTMLCreater() {
  const username = localStorage.getItem('User-name');

  const HTML = `<div class="profile-popup fade">
                      <b class="profile-popup__container">
                        <span class="profile-popup__close close">X</span>
                        <div class="profile-popup__content">
                          <h2>你好，${username}！</h2>
                          <button class="profile-popup__btn profile-popup__btn--change-username button">修改用户名</button>
                          <button class="profile-popup__btn profile-popup__btn--change-password button">修改密码</button>
                          <button class="profile-popup__btn profile-popup__btn--logout button">登出</button>
                        </divc>
                      </div>
                    </div>`;

  return HTML;
}

export default profileHTMLCreater;
