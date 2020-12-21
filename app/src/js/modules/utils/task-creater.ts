import { Task } from '../interfaces/Task';

class TaskCreater {
  private _input;
  private _levelIcon;
  private _templateTitles: string[];
  private _templateLevels: string[];

  constructor() {
    this._input = document.querySelector('.site-header__search-box__input') as HTMLInputElement;
    this._levelIcon = document.querySelector('.icon__level') as SVGElement;
    this._templateTitles = ['读完那本英文原著', '中午去睡个好觉', '日语入门学习', '尝试做些家常菜', '了解一些设计常识'];
    this._templateLevels = ['level-light', 'level-usual', 'level-heavy'];
  }

  createTask(): Task {
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

  createRandomTask(): Task {
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

  get title(): string {
    return this._input.value;
  }

  get taskLevel(): string {
    return localStorage.getItem('currentLevel') as string;
  }
  get taskTime(): string {
    return new Date().toLocaleDateString();
  }

  get taskType(): string {
    return localStorage.getItem('currentType') as string;
  }

  get taskWeek(): string {
    const toDayString = new Date().toString();
    return toDayString.slice.call(toDayString, 0, 3).toUpperCase();
  }

  get randomTitle(): string {
    return this.shuffle(this._templateTitles.slice())[0];
  }

  get randomLevel(): string {
    return this.shuffle(this._templateLevels.slice())[0];
  }

  shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export default TaskCreater;
