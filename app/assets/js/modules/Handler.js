// 加载各模块
import { sidebarModule } from './SidebarModule';
import { todolistModule } from './TodolistModule';
import { detailModule } from './DetailModule';
import { modalModule } from './ModalModule';
import * as signin from './Login/Signin';
import * as loginModal from './Login/modal';
import { signup } from './Login/Signup';

// 定义事件处理函数
const handler = (function() {
  // 变量声明
  const loginButton = document.querySelector('.site-header__loginButton');
  const loginIcon = document.querySelector('.site-header__loginIcon');
  const sidebarContent = document.querySelector('.sidebar__content');
  const deleteData = document.querySelector('.sidebar__delete');
  const section = document.querySelector('.todolist');
  const detail = document.querySelector('.detail__paragraph');

  // header 区域
  // 显示登陆注册功能模态框
  loginButton.addEventListener('click', signin.createSingleLoginModal);
  loginButton.addEventListener('click', loginModal.showLoginModal);
  loginIcon.addEventListener('click', signin.createSingleLoginModal);
  loginIcon.addEventListener('click', loginModal.showLoginModal);

  // sideBar 区域
  // 左侧任务栏类别、等级导航
  sidebarContent.addEventListener('click', sidebarModule.navigation);

  // 显示删库模态框
  deleteData.addEventListener('click', modalModule.createSingleDeleteModal);
  deleteData.addEventListener('click', showDeleteModal);

  // 删除模态框内函数
  function showDeleteModal() {
    var confirmDelete = document.querySelector('.modal__btn-yes');
    var regretDelete = document.querySelector('.modal__btn-no');
    confirmDelete.addEventListener('click', modalModule.deleteAllTasks);
    regretDelete.addEventListener('click', modalModule.regretDeleteTasks);
  }

  // todolist 区域
  // 修改任务标题
  section.addEventListener('focusout', todolistModule.changeTaskTitle);

  // 任务已完成功能
  section.addEventListener('click', todolistModule.finishTask);

  // 删除任务
  section.addEventListener('click', todolistModule.deleteTask);

  // 点击任务显示详情
  section.addEventListener('click', todolistModule.showTaskDetail);

  // 右侧任务详情区域
  detail.addEventListener('focusout', detailModule.refreshDetail);
})();

export { handler };
