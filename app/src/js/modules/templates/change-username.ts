const changeUserPopup = `<div class="profile-popup__change-username">
                          <h2 class="profile-popup__welcome">修改用户名</h2>
                          <form class="profile-popup__form form form__change-username">
                            <div class="form-control">
                              <input
                                class="current-username profile-popup__input"
                                name="username"
                                type="text"
                                placeholder="当前用户名"
                              />
                              <p></p>
                            </div>
                            <div class="form-control">
                              <input
                                class="new-username profile-popup__input"
                                name="newUsername"
                                type="text"
                                placeholder="新用户名"
                              />
                              <p></p>
                            </div>
                            <button class='profile-popup__button change-username__submit' type="submit">提交</button>
                          </form>
                        </div>`;

export default changeUserPopup;
