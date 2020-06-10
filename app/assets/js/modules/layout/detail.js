// 加载中间件模块
import {backendDB as db} from '../database/db-interface';

// 定义右侧详情模块
// 更新任务详情功能
function refreshDetail() {
  const focusTask = document.querySelector('.todolist__focus');
  const idNum = focusTask.getAttribute('idnum');
  const detailContent = this.value;
  const type = 'detail';
  db.modifyTask(idNum, type, detailContent);
}

export {refreshDetail};
