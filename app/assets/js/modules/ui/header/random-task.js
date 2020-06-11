// 加载各模块
import {backendDB as db} from '../../database/db-interface';

function createRandomTask() {
  const typeValue = document
    .querySelector('.sidebar__act')
    .getAttribute('taskType');
  db.addRandomTask();
  db.renderByTaskType(typeValue);
}

export default createRandomTask;
