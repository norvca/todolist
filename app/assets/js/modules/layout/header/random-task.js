// 加载各模块
import {backendDB as db} from '../../utils/db-interface';

function createRandomTask() {
  const typeValue = document
    .querySelector('.sidebar__act')
    .getAttribute('taskType');
  db.addRandomTask();
  db.sortByTaskType(typeValue);
}

export default createRandomTask;
