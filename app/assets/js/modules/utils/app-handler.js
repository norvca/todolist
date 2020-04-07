// 加载各模块
import * as sidebar from '../layout/sidebar';
import * as todolistMain from '../layout/todolist';
import * as todolistDetail from '../layout/detail';

const loginButton = document.querySelector('.site-header__loginButton');
const loginIcon = document.querySelector('.site-header__loginIcon');
const sidebarContent = document.querySelector('.sidebar__content');
const deleteData = document.querySelector('.sidebar__delete');
const section = document.querySelector('.todolist');
const detail = document.querySelector('.detail__paragraph');

// sideBar 区域
// 左侧任务栏类别、等级导航
sidebarContent.addEventListener('click', sidebar.navigation);

// todolist 区域
// 修改任务标题
section.addEventListener('focusout', todolistMain.changeTaskTitle);

// 任务已完成功能
section.addEventListener('click', todolistMain.finishTask);

// 删除任务
section.addEventListener('click', todolistMain.deleteTask);

// 点击任务显示详情
section.addEventListener('click', todolistMain.showTaskDetail);

// 右侧任务详情区域
detail.addEventListener('focusout', todolistDetail.refreshDetail);

// 显示删库模态框
deleteData.addEventListener('click', () => {
  import(
    /* webpackChunkName: "delete-all", webpackPrefetch: true */ '../layout/popups/deleteAll-popup'
  ).then(({createDeletePopup}) => {
    createDeletePopup();
  });
});

// header 区域
// 显示登陆注册功能模态框
loginButton.addEventListener('click', () => {
  import(
    /* webpackChunkName: "login", webpackPrefetch: true */ '../layout/popups/login-popup'
  ).then(({createHtml}) => {
    createHtml();
  });
});

// 显示登陆注册功能模态框：手机模式
loginIcon.addEventListener('click', () => {
  import(
    /* webpackChunkName: "login", webpackPrefetch: true */ '../layout/popups/login-popup'
  ).then(({createHtml}) => {
    createHtml();
  });
});
