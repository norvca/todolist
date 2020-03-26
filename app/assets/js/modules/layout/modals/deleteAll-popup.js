// 加载数据库模块
import {backendDB as db} from '../../utils/db-interface';
import deleteAllHTML from '../../templates/deleteAllTemplate';

// 生成删除数据库的模态框
const createDeleteModal = () => {
  document.body.insertAdjacentHTML('beforeend', deleteAllHTML);
  modalHandler();
};

// 模态框事件处理
function modalHandler() {
  var confirmDelete = document.querySelector('.modal__btn-yes');
  var regretDelete = document.querySelector('.modal__btn-no');

  confirmDelete.addEventListener('click', deleteAllTasks);
  regretDelete.addEventListener('click', regretDeleteTasks);
}

// 清除数据库
function deleteAllTasks() {
  // 删除数据库
  db.deleteAllTasks();
  deleteModal();
}

// 不清除数据库
function regretDeleteTasks() {
  deleteModal();
}

// 删除模态框
function deleteModal() {
  const modal = document.querySelector('.modal');
  modal.remove();
}

export {createDeleteModal};
