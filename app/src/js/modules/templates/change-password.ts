const changePassPopup = `<div class="profile-popup__change-password">
                          <h2 class="profile-popup__welcome">修改密码</h2>
                          <form class="profile-popup__form form form__change-password">
                            <div class="form-control">
                              <input
                                class="password profile-popup__input"
                                name="password"
                                type="text"
                                placeholder="当前密码"
                              />
                              <p></p>
                            </div>
                            <div class="form-control">
                              <input
                                class="new-password profile-popup__input"
                                name="new-password"
                                type="password"
                                placeholder="输入新密码"
                              />
                              <p></p>
                            </div>
                            <div class="form-control">
                              <input
                                class="confirm-new-password profile-popup__input"
                                name="confirm-new-password"
                                type="password"
                                placeholder="确认新密码"
                              />
                              <p></p>
                            </div>
                            <button class='profile-popup__button change-password__submit' type="submit">提交</button>
                          </form>
                        </div>`;

export default changePassPopup;
