// 加载各模块
import {sidebarModule} from "./SidebarModule";
import {todolistModule} from "./TodolistModule";
import {detailModule} from "./DetailModule";
import {modalModule} from "./ModalModule";
import {helperFunction} from "./HelperFunction";


// 变量声明
const sidebarContent = document.querySelector(".sidebar__content");
const deleteData = document.querySelector(".sidebar__delete");
const section = document.querySelector(".todolist");
const detail = document.querySelector(".detail__paragraph");


// 定义事件处理函数
const handler = (function() {
    // sideBar 区域
    // 左侧任务栏类别、等级导航
    sidebarContent.addEventListener("click", sidebarModule.navigation);

    // 显示删库模态框
    deleteData.addEventListener("click", modalModule.createSingleDeleteModal);


    // todolist 区域
    // 修改任务标题
    section.addEventListener("focusout", todolistModule.changeTaskTitle);

    // 任务已完成功能
    section.addEventListener("click", todolistModule.finishTask);

    // 删除任务
    section.addEventListener("click", todolistModule.deleteTask);

    // 点击任务显示详情
    section.addEventListener("click", todolistModule.showTaskDetail);


    // 右侧任务详情区域
    detail.addEventListener("focusout", detailModule.refreshDetail);


    // 模态框区域
    // 是否清空数据库
    document.body.addEventListener("click", function(e) {
      let target = e.target;

      // 删除数据库数据
      if (target.classList.contains('modal__btn-yes')) {
        modalModule.deleteAllTasks();
        return;
      // 返回
      } else if (target.classList.contains('modal__btn-no')) {
        modalModule.regretDeleteTasks();
      }
    });
})();

export {handler};