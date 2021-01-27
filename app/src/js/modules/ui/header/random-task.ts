// 加载各模块
import { backendDB as db } from '../../model/db-interface';

function createRandomTask(): void {
  const currentTaskTypeElement = document.querySelector('.sidebar__act') as HTMLLIElement;
  const currentTaskType = currentTaskTypeElement.getAttribute('taskType') as string;

  db.addRandomTask();
  db.searchByTaskType(currentTaskType);
}

export default createRandomTask;
