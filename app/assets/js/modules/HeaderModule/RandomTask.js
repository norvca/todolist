// 加载各模块
import {backendDB as db} from "../BackendDB";

// 触发随机任务模块
class RandomTask {
  constructor() {
    this.randomFire = document.querySelector(".site-header__random-task__fire");
    this.randomContentNow = ["读完那本英文原著", "中午去睡个好觉", "日语入门学习", "尝试做些家常菜", "了解一些设计常识"];
    this.randomLevel = ["bgc-light", "bgc-usual", "bgc-heavy"];
    this.event();
  }

  event() {
    this.randomFire.addEventListener("click", this.randomTask.bind(this))
  }

  randomTask() {
      const ContentIndex = parseInt(Math.random() * this.randomContentNow.length);
      const LevelIndex = parseInt(Math.random() * 3);
      const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
      db.addTask(this.randomContentNow[ContentIndex], this.randomLevel[LevelIndex]);
      db.showTask("taskType", typeValue);
  }
}

export default RandomTask;