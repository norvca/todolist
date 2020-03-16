// 加载中间件模块
import { backendDB as db } from './utils/db-interface';

// 主界面模块
// 修改任务标题功能
function changeTaskTitle(e) {
  if (e.target.tagName.toUpperCase() === 'SPAN') {
    const idNum = e.target.getAttribute('idnum');
    const newTitle = e.target.innerText;

    db.modifyTask(idNum, 'title', newTitle);
  }
}

// 任务已完成功能
function finishTask(e) {
  const taskList = document.querySelector('.todolist__list');
  const focusedTask = document.querySelector('.todolist__focus');
  if (e.target.classList.contains('icon__nofinish')) {
    const idNum = e.target.getAttribute('idnum');
    db.modifyTask(idNum, 'taskType', 'finish');
    // 删除页面上的数据
    const ele = e.target.parentNode.parentNode;
    const hasPrevTask = ele.previousSibling.classList.contains(
      'todolist__content'
    );
    const NextTask = ele.nextSibling;

    // 判断是否需要删除时间戳
    if (
      (!hasPrevTask && NextTask == null) ||
      (!hasPrevTask && !NextTask.classList.contains('todolist__content'))
    ) {
      ele.parentNode.removeChild(ele.previousSibling);
    }

    // 删除页面任务
    ele.parentNode.removeChild(ele);
    // 首任务聚焦
    if (taskList.firstChild) {
      // 删除的正好是焦点任务就重新聚焦
      if (ele === focusedTask) {
        const firstTask = taskList.firstChild.nextSibling;
        firstTask.classList.add('todolist__focus');
        db.showDetail(firstTask.getAttribute('idnum'));
      }
    } else {
      db.showDetail();
    }
  }
}

// 任务删除功能
function deleteTask(e) {
  const taskList = document.querySelector('.todolist__list');
  const focusedTask = document.querySelector('.todolist__focus');
  if (e.target.classList.contains('icon__delete')) {
    const idNum = e.target.getAttribute('idnum');
    db.modifyTask(idNum, 'taskType', 'bin');

    // 删除页面上的数据
    const ele = e.target.parentNode.parentNode;
    const hasPrevTask = ele.previousSibling.classList.contains(
      'todolist__content'
    );
    const NextTask = ele.nextSibling;

    // 判断是否需要删除时间戳
    if (
      (!hasPrevTask && NextTask == null) ||
      (!hasPrevTask && !NextTask.classList.contains('todolist__content'))
    ) {
      ele.parentNode.removeChild(ele.previousSibling);
    }

    // 删除页面任务
    ele.parentNode.removeChild(ele);
    // 首任务聚焦
    if (taskList.firstChild) {
      // 删除的正好是焦点任务就重新聚焦
      if (ele === focusedTask) {
        const firstTask = taskList.firstChild.nextSibling;
        firstTask.classList.add('todolist__focus');
        db.showDetail(firstTask.getAttribute('idnum'));
      }
    } else {
      db.showDetail();
    }
  }
}

// 显示任务详情功能
function showTaskDetail(e) {
  if (e.target.classList.contains('todolist__content')) {
    const childNodes = e.target.parentNode.childNodes;
    const taskID = e.target.getAttribute('idnum');
    childNodes.forEach(e => {
      e.classList.remove('todolist__focus');
    });

    e.target.classList.add('todolist__focus');
    db.showDetail(taskID);
  }
}

export { changeTaskTitle, finishTask, deleteTask, showTaskDetail };
