import {backendDB as db} from '../../database/db-interface';
import deleteAllHTML from '../../templates/deleteAll-template';

// 创建模态框
const createPopup = () => {
  document.body.insertAdjacentHTML('beforeend', deleteAllHTML);
  popupHandler();
};

// 事件处理中心
function popupHandler() {
  var confirmDelete = document.querySelector('.deleteAll-popup__btn-yes');
  var regretDelete = document.querySelector('.deleteAll-popup__btn-no');

  confirmDelete.addEventListener('click', deleteAllTasks);
  regretDelete.addEventListener('click', regretDeleteTasks);
}

// 清除数据库
function deleteAllTasks() {
  db.deleteAllTasks();
  deletePopup();
}

// 不清除数据库
function regretDeleteTasks() {
  deletePopup();
}

// 删除模态框
function deletePopup() {
  const modal = document.querySelector('.deleteAll-popup');
  modal.remove();
}

export {createPopup};
