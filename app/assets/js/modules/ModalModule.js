// 加载数据库模块
import {backendDB as db} from "./BackendDB";

// 因为单一职责原则，把创建对象函数和形成单例的函数分开写
// 生成删除数据库的模态框
const createDeleteModal = () => {
  // 创建模态框
  const deleteModal = document.createElement('div');
  deleteModal.classList.add('modal');
  deleteModal.innerHTML = "<div class='modal__box'>"
                        +   "<p class='modal__aware'>删除全部数据</p>"
                        +   "<div class='modal__delete'>"
                        +     "<a class='modal__btn-yes'>是的</a>"
                        +     "<a class='modal__btn-no'>再想想</a>"
                        +   "</div>"
                        + "</div>";
  // 添加到 DOM 结构里
  document.body.appendChild(deleteModal);
  return deleteModal;
};

// 单例函数
const getSingle = function(fn) {
  let instance
  return function() {
    return instance || (instance = fn());
  }
};

// 生成删除模态框的闭包
const createSingleModal = getSingle(createDeleteModal);

const modalModule = {
    // 创建单例模态框
  createSingleDeleteModal() {
    // 生成模态框的实例
    const singleModal = createSingleModal();


    // 让模态框可见
    singleModal.classList.add('modal--visible');
  },

  // 清除数据库
  deleteAllTasks() {
    // 删除数据库
    db.deleteAllTasks();

    // 隐藏模态框
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--visible');
  },

  // 不清除数据库
  regretDeleteTasks() {
    // 隐藏模态框
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--visible');
  }
}



export {modalModule};