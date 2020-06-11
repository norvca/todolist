// 切换主题模块
class ThemeChanger {
  constructor() {
    this.theme = {
      background: ['', 'theme-green', 'theme-purple', 'theme-gradual'],
      iconName: ['#icon-theme', '#icon-theme1', '#icon-theme2', '#icon-theme3'],
    };
    this.siteHeader = document.querySelector('.site-header');
    this.themeIcon = document.querySelector(
      '.site-header__theme-btn',
    ).children[0].children[0];
  }

  // 切换主题功能
  changeTheme = () => {
    this.shiftTheme();
    this.renderTheme();
  };

  shiftTheme() {
    for (let prop in this.theme) {
      let propArr = this.theme[prop];
      propArr.push(propArr.shift());
    }
  }

  renderTheme() {
    this.siteHeader.setAttribute(
      'class',
      'site-header ' + this.theme.background[0],
    );
    this.themeIcon.setAttribute('xlink:href', this.theme.iconName[0]);
  }
}

const themeChanger = new ThemeChanger();
export default themeChanger;
