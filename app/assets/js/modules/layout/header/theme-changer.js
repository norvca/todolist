// 定义变量
const theme = ['', 'theme-green', 'theme-purple', 'theme-gradual'];
const themeIconName = [
  '#icon-theme',
  '#icon-theme1',
  '#icon-theme2',
  '#icon-theme3'
];
const siteHeader = document.querySelector('.site-header');
const themeBtn = document.querySelector('.site-header__theme-btn');

// 切换主题模块
class ThemeChanger {
  constructor(theme, themeIconName, siteHeader, themeBtn) {
    this.theme = theme;
    this.themeIconName = themeIconName;
    this.siteHeader = siteHeader;
    this.themeBtn = themeBtn;
    this.event();
  }

  event() {
    this.themeBtn.addEventListener('click', this.changeTheme.bind(this));
  }

  // 切换主题功能
  changeTheme() {
    const themeIcon = this.themeBtn.children[0].children[0];
    // 切换主题数组
    this.theme.push(this.theme.shift());
    this.themeIconName.push(this.themeIconName.shift());
    // 应用主题
    this.siteHeader.setAttribute('class', 'site-header ' + this.theme[0]);
    themeIcon.setAttribute('xlink:href', this.themeIconName[0]);
  }
}

new ThemeChanger(theme, themeIconName, siteHeader, themeBtn);

export default ThemeChanger;
