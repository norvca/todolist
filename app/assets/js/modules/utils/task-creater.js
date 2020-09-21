class TaskCreater {
  constructor() {
    this._input = document.querySelector('.site-header__search-box__input');
    this._levelIcon = document.querySelector('.icon__level');
    this._templateTitles = [
      '读完那本英文原著',
      '中午去睡个好觉',
      '日语入门学习',
      '尝试做些家常菜',
      '了解一些设计常识',
    ];
    this._templateLevels = ['level-light', 'level-usual', 'level-heavy'];
  }

  createTask() {
    return {
      _id: new Date().toISOString(),
      title: this.title,
      level: this.taskLevel,
      taskTime: this.taskTime,
      taskType: this.taskType,
      taskWeek: this.taskWeek,
      detail: null,
    };
  }

  createRandomTask() {
    const test = {
      _id: new Date().toISOString(),
      title: this.randomTitle,
      level: this.randomLevel,
      taskTime: this.taskTime,
      taskType: this.taskType,
      taskWeek: this.taskWeek,
      detail: null,
    };
    return test;
  }

  get title() {
    return this._input.value;
  }

  get taskLevel() {
    return localStorage.getItem('currentLevel');
  }
  get taskTime() {
    return new Date().toLocaleDateString();
  }

  get taskType() {
    return localStorage.getItem('currentType');
  }

  get taskWeek() {
    const toDayString = new Date().toString();
    return toDayString.slice.call(toDayString, 0, 3).toUpperCase();
  }

  get randomTitle() {
    return this.shuffle(this._templateTitles.slice())[0];
  }

  get randomLevel() {
    return this.shuffle(this._templateLevels.slice())[0];
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

const taskCreater = new TaskCreater();
export default taskCreater;
