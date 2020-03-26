// 加载数据库模块
import {backendDB as db} from '../../utils/db-interface';
import deleteAllHTML from '../../templates/deleteAll-template';

// 生成删除数据库的模态框
const createDeletePopup = () => {
  document.body.insertAdjacentHTML('beforeend', deleteAllHTML);
  popupHandler();
};

// 模态框事件处理
function popupHandler() {
  var confirmDelete = document.querySelector('.deleteAll-popup__btn-yes');
  var regretDelete = document.querySelector('.deleteAll-popup__btn-no');

  confirmDelete.addEventListener('click', deleteAllTasks);
  regretDelete.addEventListener('click', regretDeleteTasks);
}

// 清除数据库
function deleteAllTasks() {
  db.deleteAllTasks();
  deleteModal();
}

// 不清除数据库
function regretDeleteTasks() {
  deleteModal();
}

// 删除模态框
function deleteModal() {
  const modal = document.querySelector('.deleteAll-popup');
  modal.remove();
}

export {createDeletePopup};
