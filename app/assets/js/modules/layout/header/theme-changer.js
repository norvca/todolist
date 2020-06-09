// 切换主题模块
class ThemeChanger {
  constructor() {
    this.theme = ['', 'theme-green', 'theme-purple', 'theme-gradual'];
    this.themeIconName = [
      '#icon-theme',
      '#icon-theme1',
      '#icon-theme2',
      '#icon-theme3',
    ];
    this.siteHeader = document.querySelector('.site-header');
    this.themeBtn = document.querySelector('.site-header__theme-btn');
  }

  // 切换主题功能
  changeTheme() {
    this.shiftTheme();
    this.renderTheme();
  }

  shiftTheme() {
    this.theme.push(this.theme.shift());
    this.themeIconName.push(this.themeIconName.shift());
  }

  renderTheme() {
    this.siteHeader.setAttribute('class', 'site-header ' + this.theme[0]);

    const themeIcon = this.themeBtn.children[0].children[0];
    themeIcon.setAttribute('xlink:href', this.themeIconName[0]);
  }
}

const themeChanger = new ThemeChanger();
export default themeChanger;
