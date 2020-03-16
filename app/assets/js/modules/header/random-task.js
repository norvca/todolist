// 加载各模块
import { backendDB as db } from '../utils/db-interface';

// 定义变量
const randomTaskBtn = document.querySelector('.site-header__random-task__fire');
const randomContent = [
  '读完那本英文原著',
  '中午去睡个好觉',
  '日语入门学习',
  '尝试做些家常菜',
  '了解一些设计常识'
];
const randomLevel = ['bgc-light', 'bgc-usual', 'bgc-heavy'];

// 触发随机任务模块
class RandomTask {
  constructor(randomTaskBtn, randomContent, randomLevel) {
    this.randomTaskBtn = randomTaskBtn;
    this.randomContent = randomContent;
    this.randomLevel = randomLevel;
    this.event();
  }

  event() {
    this.randomTaskBtn.addEventListener('click', this.randomTask.bind(this));
  }

  randomTask() {
    const ContentIndex = parseInt(Math.random() * this.randomContent.length);
    const LevelIndex = parseInt(Math.random() * 3);
    const typeValue = document
      .querySelector('.sidebar__act')
      .getAttribute('taskType');
    db.addTask(this.randomContent[ContentIndex], this.randomLevel[LevelIndex]);
    db.showTask('taskType', typeValue);
  }
}

new RandomTask(randomTaskBtn, randomContent, randomLevel);

export default RandomTask;
