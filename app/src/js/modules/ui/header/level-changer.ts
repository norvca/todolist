class LevelChanger {
  private levels: [string, string, string];
  private levelChangeBtn;

  constructor() {
    this.levels = ['level-light', 'level-usual', 'level-heavy'];
    this.levelChangeBtn = document.querySelector('.icon__level') as SVGElement;
  }

  changeLevel() {
    this.shiftLevel();
    this.renderLevel();

    // Store current level in local storage
    localStorage.setItem('currentLevel', this.currentLevel);
  }

  shiftLevel() {
    const firstLevel = this.levels.shift() as string;
    this.levels.push(firstLevel);
  }

  renderLevel() {
    this.levelChangeBtn.setAttribute('class', `icon icon__level ${this.currentLevel}`);
    this.levelChangeBtn.setAttribute('level', this.currentLevel);
  }

  get currentLevel() {
    return this.levels[0];
  }
}

const levelChanger = new LevelChanger();
export default levelChanger;
