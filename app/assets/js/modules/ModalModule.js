// 加载数据库模块
import {backendDB as db} from "./BackendDB";

const modalModule = {
    // 生成删除数据库的模态框
    createDeleteModal() {
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
    },

    // 单例函数
    getSingle(fn) {
      var instance
      return function() {
        if(!instance) {
          console.log(1)
          return instance = fn.apply(this, arguments);
        }
        console.log(2)
        return instance;
      }
    },

    // 创建单例模态框
    createSingleDeleteModal() {
      var createSingleModal = modalModule.getSingle(modalModule.createDeleteModal);
      var singleModal = createSingleModal()
      console.log(singleModal)

      // 让模态框可见
      let modal = document.querySelector('.modal');
      modal.classList.add('modal--visible');
    },

    // 清除数据库
    deleteAllTasks() {
      // 删除数据库
      db.deleteAllTasks();

      // 隐藏模态框
      let modal = document.querySelector('.modal');
      modal.classList.remove('modal--visible');
    },

    // 不清除数据库
    regretDeleteTasks() {
      // 隐藏模态框
      let modal = document.querySelector('.modal');
      console.log(modal)
      modal.classList.remove('modal--visible');
    }
};

export {modalModule};