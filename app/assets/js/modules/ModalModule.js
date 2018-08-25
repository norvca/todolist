// 加载数据库模块
import {backendDB as db} from "./BackendDB";

// 因为单一职责原则，把创建对象函数和形成单例的函数分开写
// 生成删除数据库的模态框
// const createDeleteModal = () => {
//   // 创建模态框
//   const deleteModal = document.createElement('div');
//   deleteModal.classList.add('modal');
//   deleteModal.innerHTML = "<div class='modal__box'>"
//                         +   "<p class='modal__aware'>删除全部数据</p>"
//                         +   "<div class='modal__delete'>"
//                         +     "<a class='modal__btn-yes'>是的</a>"
//                         +     "<a class='modal__btn-no'>再想想</a>"
//                         +   "</div>"
//                         + "</div>";
//   // 添加到 DOM 结构里
//   document.body.appendChild(deleteModal);
//   return deleteModal;
// };

// 单例函数
// const getSingle = function(fn) {
//   let instance
//   return function() {
//     return instance || (instance = fn());
//   }
// };

// // 生成删除模态框的闭包
// const createSingleModal = getSingle(createDeleteModal);

// // 创建单例模态框
// const createSingleDeleteModal = () => {
//   // 生成模态框的实例
//   const singleModal = createSingleModal();


//   // 让模态框可见
//   singleModal.classList.add('modal--visible');
// };

// // 清除数据库
// const deleteAllTasks = () => {
//   // 删除数据库
//   db.deleteAllTasks();

//   // 隐藏模态框
//   const modal = document.querySelector('.modal');
//   modal.classList.remove('modal--visible');
// };

// // 不清除数据库
// const regretDeleteTasks = () => {
//   // 隐藏模态框
//   const modal = document.querySelector('.modal');
//   modal.classList.remove('modal--visible');
// }

// export {createSingleDeleteModal, deleteAllTasks, regretDeleteTasks};





class ModalModule {
  constructor() {
    this.deleteDataButton = document.querySelector(".sidebar__delete");
    this.event();
  }

  event() {
    this.deleteDataButton.addEventListener("click", this.createSingleDeleteModal.bind(this));

    // 是否清空数据库
    document.body.addEventListener("click", (e) => {
      let target = e.target;

      // 删除数据库数据
      if (target.classList.contains('modal__btn-yes')) {
        this.deleteAllTasks();
        return;
      // 返回
      } else if (target.classList.contains('modal__btn-no')) {
        this.regretDeleteTasks();
      }
    });
  }

  createModal() {
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
  }

  // 创建单例模态框
  createSingleDeleteModal() {
    // 生成模态框的实例
    const singleModal = this.createModal();


    // 让模态框可见
    singleModal.classList.add('modal--visible');
  };

  // 清除数据库
  deleteAllTasks() {
    // 删除数据库
    db.deleteAllTasks();

    // 隐藏模态框
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--visible');
  };

  // 不清除数据库
  regretDeleteTasks() {
    // 隐藏模态框
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--visible');
  };
}


// 单例效果实现
const getSingleModule = (function() {
  let modalModule;
  return function() {
    if (!modalModule) {
        console.log(1)
        modalModule = new ModalModule();
    }
    return modalModule
  }
})();

export default getSingleModule;
