class LevelChanger {
  constructor() {
    this.levels = {
      status: ['level-light', 'level-usual', 'level-heavy'],
      colors: ['bgc-light', 'bgc-usual', 'bgc-heavy'],
    };
    this.levelChangeBtn = document.querySelector('.icon__level');
  }

  changeLevel() {
    this.shiftLevel();
    this.renderLevel();
  }

  shiftLevel() {
    for (let prop in this.levels) {
      let propArr = this.levels[prop];
      propArr.push(propArr.shift());
    }
  }

  renderLevel() {
    this.levelChangeBtn.setAttribute(
      'class',
      `icon icon__level ${this.levels.status[0]}`,
    );
    this.levelChangeBtn.setAttribute('level', this.levels.colors[0]);
  }
}

const levelChanger = new LevelChanger();
export default levelChanger;
