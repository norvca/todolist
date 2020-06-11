// 加载中间件模块
import {backendDB as db} from '../database/db-interface';
import pubsub from '../utils/pubsub';

const detailContent = document.querySelector('.detail__paragraph');
const detailTitle = document.querySelector('.detail__title');

pubsub.on('showDetail', showDetail);

// 定义右侧详情模块
// 更新任务详情功能
function refreshDetail() {
  const focusTask = document.querySelector('.todolist__focus');
  const idNum = focusTask.getAttribute('idnum');
  const detailContent = this.value;
  const type = 'detail';
  db.modifyTask(idNum, type, detailContent);
}

function showDetail({title, detail}) {
  detailTitle.innerText = title;
  detailContent.placeholder = '添加任务详情...';
  detailContent.value = detail;
}

function clearDetail() {
  detailTitle.innerText = '';
  detailContent.placeholder = '此分类目前没有任务哦~';
  detailContent.value = '';
}

export {refreshDetail, clearDetail};
