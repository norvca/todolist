class LevelChanger {
  constructor() {
    this.level = ['level-light', 'level-usual', 'level-heavy'];
    this.levelChangeBtn = document.querySelector('.icon__level');
  }

  changeLevel() {
    this.shiftLevel();
    this.renderLevel();
  }

  shiftLevel() {
    this.level.push(this.level.shift());
  }

  renderLevel() {
    this.levelChangeBtn.setAttribute(
      'class',
      `icon icon__level ${this.level[0]}`,
    );
    this.levelChangeBtn.setAttribute('level', this.level[0]);
  }
}

const levelChanger = new LevelChanger();
export default levelChanger;
