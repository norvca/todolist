// 加载各模块
var db = require('./modules/DB');
var headerModule = require('./modules/HeaderModule');
var sidebarModule = require('./modules/SidebarModule');
var todolistModule = require('./modules/TodolistModule');
var detailModule = require('./modules/DetailModule');
var modalModule = require('./modules/ModalModule');

// 变量声明
var randomFire = document.querySelector('.site-header__random-task__fire');
var searchbox = document.querySelector('.site-header__search-box__content');
var input = document.querySelector('.site-header__search-box__input');
var level = document.querySelector('.icon__level');
var addBtn = document.querySelector('.icon__add');
var themeBtn = document.querySelector('.site-header__theme-btn');
var sidebarContent = document.querySelector('.sidebar__content');
var deleteData = document.querySelector('.sidebar__delete');
var section = document.querySelector('.todolist');
var detail = document.querySelector('.detail__paragraph');
var modal = document.querySelector('.modal');


// site-header 区域
// 点击触发随机事件
randomFire.addEventListener('click', headerModule.randomTask);

// 开启查找任务功能
searchbox.addEventListener('click', headerModule.openSearchTask);

// 输入框输入数据查找
input.addEventListener('keyup', headerModule.searchTask);

// 任务等级切换
level.onclick = headerModule.changeLevel;

// 添加任务
addBtn.addEventListener('click', headerModule.addTask1);

// 回车添加任务
document.onkeyup = headerModule.addTask2;

// 主题切换
themeBtn.addEventListener('click', headerModule.changeTheme);


// sideBar 区域
// 左侧任务栏类别、等级导航
sidebarContent.addEventListener('click', sidebarModule.navigation);

// 显示删库模态框
deleteData.addEventListener('click', sidebarModule.showModalBox);


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


// 模态框区域
// 是否清空数据库
modal.addEventListener('click', modalModule.isDeleteDB);
