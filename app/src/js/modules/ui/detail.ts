// 加载中间件模块
import { backendDB as db } from '../database/db-interface';
import pubsub from '../utils/pubsub';
import { DetailInfo } from '../interfaces/Detail';

const detailContent = document.querySelector('.detail__paragraph') as HTMLTextAreaElement;
const detailTitle = document.querySelector('.detail__title') as HTMLHeadingElement;

pubsub.on('showDetail', showDetail);

// 定义右侧详情模块
// 更新任务详情功能
function refreshDetail(e: FocusEvent): void {
  const target = e.target as HTMLTextAreaElement;
  const detailContent = target.value;
  const focusTask = document.querySelector('.todolist__focus') as HTMLLIElement;
  const idNum = focusTask.getAttribute('idnum') as string;
  const type = 'detail';
  db.modifyTask(idNum, type, detailContent);
}

function showDetail({ title, detail }: DetailInfo) {
  detailTitle.innerText = title;
  detailContent.placeholder = '添加任务详情...';
  detailContent.value = detail;
}

function clearDetail(): void {
  detailTitle.innerText = '';
  detailContent.placeholder = '此分类目前没有任务哦~';
  detailContent.value = '';
}

export { refreshDetail, clearDetail };
