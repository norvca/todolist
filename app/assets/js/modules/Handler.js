// 加载各模块
import {headerModule} from "./HeaderModule";
import {sidebarModule} from "./SidebarModule";
import {todolistModule} from "./TodolistModule";
import {detailModule} from "./DetailModule";
import {modalModule} from "./ModalModule";
import {helperFunction} from "./HelperFunction";

// 变量声明
const randomFire = document.querySelector(".site-header__random-task__fire");
const searchbox = document.querySelector(".site-header__search-box__content");
const addBtn = document.querySelector(".icon__add");
const themeBtn = document.querySelector(".site-header__theme-btn");
const sidebarContent = document.querySelector(".sidebar__content");
const deleteData = document.querySelector(".sidebar__delete");
const section = document.querySelector(".todolist");
const detail = document.querySelector(".detail__paragraph");
const input = helperFunction.get_input_element();
const level = helperFunction.get_level_element();

// 定义事件处理函数
const handler = (function() {
    // site-header 区域
    // 点击触发随机事件
    randomFire.addEventListener("click", headerModule.randomTask);

    // 开启查找任务功能
    searchbox.addEventListener("click", headerModule.openSearchTask);

    // 输入框输入数据查找
    input.addEventListener("keyup", headerModule.searchTask);

    // 任务等级切换
    level.onclick = headerModule.changeLevel;

    // 添加任务
    addBtn.addEventListener("click", headerModule.addTask1);

    // 回车添加任务
    document.onkeyup = headerModule.addTask2;

    // 主题切换
    themeBtn.addEventListener("click", headerModule.changeTheme);


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