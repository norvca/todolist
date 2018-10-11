// 切换主题模块
class ThemeChanger {
  constructor() {
    this.theme = ["", "theme-green", "theme-purple", "theme-gradual"];
    this.themeIconName = ["#icon-theme", "#icon-theme1", "#icon-theme2", "#icon-theme3"];
    this.siteHeader = document.querySelector(".site-header");
    this.themeBtn = document.querySelector(".site-header__theme-btn");
    this.event();
  }

  event() {
    this.themeBtn.addEventListener("click", this.changeTheme.bind(this));
  }

  // 切换主题功能
  changeTheme(){
      const themeIcon = this.themeBtn.children[0].children[0];
      // 切换主题数组
      this.theme.push(this.theme.shift());
      this.themeIconName.push(this.themeIconName.shift());
      // 应用主题
      this.siteHeader.setAttribute("class", ("site-header "+ this.theme[0]));
      themeIcon.setAttribute("xlink:href", this.themeIconName[0]);
  }
}

export default ThemeChanger;