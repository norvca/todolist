class TaskCreater {
  constructor() {
    this._title = document.querySelector('.site-header__search-box__input');
    this._taskLevel = document.querySelector('.icon__level');
    this._titles = [
      '读完那本英文原著',
      '中午去睡个好觉',
      '日语入门学习',
      '尝试做些家常菜',
      '了解一些设计常识',
    ];
    this._levels = ['bgc-light', 'bgc-usual', 'bgc-heavy'];
  }

  createTask() {
    const test = {
      _id: new Date().toISOString(),
      title: this.title,
      level: this.taskLevel,
      taskTime: this.taskTime,
      taskType: this.taskType,
      taskWeek: this.taskWeek,
      detail: null,
    };
    console.log(test);
    return test;
  }

  get title() {
    return this._title.value;
  }

  get taskLevel() {
    return this._taskLevel.getAttribute('level');
  }
  get taskTime() {
    return new Date().toLocaleDateString();
  }

  get taskType() {
    const currentType = document.querySelector('.sidebar__act');
    return currentType.getAttribute('taskType');
  }

  get taskWeek() {
    const toDayString = new Date().toString();
    return toDayString.slice.call(toDayString, 0, 3).toUpperCase();
  }
}

const taskCreater = new TaskCreater();
export default taskCreater;
