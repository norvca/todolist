class LevelChanger {
  constructor() {
    this.levels = ['level-light', 'level-usual', 'level-heavy'];
    this.levelChangeBtn = document.querySelector('.icon__level');
  }

  changeLevel() {
    this.shiftLevel();
    this.renderLevel();

    // Store current level in local storage
    localStorage.setItem('currentLevel', this.currentLevel);
  }

  shiftLevel() {
    this.levels.push(this.levels.shift());
  }

  renderLevel() {
    this.levelChangeBtn.setAttribute(
      'class',
      `icon icon__level ${this.currentLevel}`,
    );
    this.levelChangeBtn.setAttribute('level', this.currentLevel);
  }

  get currentLevel() {
    return this.levels[0];
  }
}

const levelChanger = new LevelChanger();
export default levelChanger;
