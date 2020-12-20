function profileHTMLCreater(): string {
  const username = localStorage.getItem('User-name');

  const HTML = `<div class="profile-popup fade">
                  <div class="profile-popup__container">
                    <div class="profile-popup__utils">
                      <span class="profile-popup__utils__return hidden">&larr;</span>
                      <span class="profile-popup__utils__gap"></span>
                      <span class="profile-popup__utils__close close">X</span>
                    </div>
                    <div class="profile-popup__content">
                      <h2>你好，${username}！</h2>
                      <button class="profile-popup__btn profile-popup__btn--change-username button">修改用户名</button>
                      <button class="profile-popup__btn profile-popup__btn--change-password button">修改密码</button>
                      <button class="profile-popup__btn profile-popup__btn--logout button">登出</button>
                    </div>
                  </div>
                </div>`;
  return HTML;
}

export default profileHTMLCreater;
