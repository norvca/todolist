// 加载各模块
import * as sidebar from '../layout/sidebar';
import * as todolistMain from '../layout/todolist';
import * as todolistDetail from '../layout/detail';
import * as levelChanger from '../layout/header/level-changer';
import createRandomTask from '../layout/header/random-task';
import searchBar from '../layout/header/search-bar';
import themeChanger from '../layout/header/theme-changer';

const levelChangeBtn = document.querySelector('.icon__level');
const loginButton = document.querySelector('.site-header__loginButton');
const loginIcon = document.querySelector('.site-header__loginIcon');
const sidebarContent = document.querySelector('.sidebar__content');
const deleteData = document.querySelector('.sidebar__delete');
const section = document.querySelector('.todolist');
const detail = document.querySelector('.detail__paragraph');
const randomTaskBtn = document.querySelector('.site-header__random-task__fire');
const searchBox = document.querySelector('.site-header__search-box__content');
const searBarInput = document.querySelector('.site-header__search-box__input');
const addBtn = document.querySelector('.icon__add');
const themeBtn = document.querySelector('.site-header__theme-btn');

// header 区域
// 开启查找任务功能
searchBox.addEventListener('click', searchBar.openSearchTask.bind(searchBar));

// 查找任务
searBarInput.addEventListener('keyup', searchBar.searchTask);

// 添加任务
searBarInput.addEventListener('keyup', searchBar.addTask2.bind(searchBar));
addBtn.addEventListener('click', searchBar.addTask1.bind(searchBar));

// 添加随机任务
randomTaskBtn.addEventListener('click', createRandomTask);

// 切换任务类型
levelChangeBtn.addEventListener('click', levelChanger.changeLevel);

// 切换主题
themeBtn.addEventListener('click', themeChanger.changeTheme.bind(themeChanger));

// 显示登陆注册功能模态框
loginButton.addEventListener('click', createLoginPopupDesktop());

// 显示登陆注册功能模态框：手机模式
loginIcon.addEventListener('click', createLoginPopupPhone());

// sideBar 区域
// 左侧任务栏类别、等级导航
sidebarContent.addEventListener('click', sidebar.navigate);

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
deleteData.addEventListener('click', createDeletePopup());

// 动态加载的登录框
function createLoginPopupDesktop() {
  return () => {
    import(
      /* webpackChunkName: "login", webpackPrefetch: true */ '../layout/popups/login-popup'
    ).then(({createPopup}) => {
      createPopup();
    });
  };
}

// 动态加载的登录框
function createLoginPopupPhone() {
  return () => {
    import(
      /* webpackChunkName: "login", webpackPrefetch: true */ '../layout/popups/login-popup'
    ).then(({createPopup}) => {
      createPopup();
    });
  };
}

// 动态加载的删除任务框
function createDeletePopup() {
  return () => {
    import(
      /* webpackChunkName: "delete-all", webpackPrefetch: true */ '../layout/popups/deleteAll-popup'
    ).then(({createPopup}) => {
      createPopup();
    });
  };
}
