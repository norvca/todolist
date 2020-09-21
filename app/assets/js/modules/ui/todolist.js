// 加载中间件模块
import {backendDB as db} from '../database/db-interface';
import {clearDetail} from '../ui/detail';
import timeStampTemplate from '../templates/timeStamp-template';
import taskItemTemplate from '../templates/taskItem-template';
import pubsub from '../utils/pubsub';

pubsub.on('renderByTaskType', renderTasks);
pubsub.on('renderByLevel', renderTasks);
pubsub.on('renderBySearch', renderBySearch);

// 主界面模块
function renderTasks(tasks) {
  let indexTime = '';
  const taskLists = document.querySelector('.todolist__tasks');
  const taskList = document.createElement('ul');
  taskList.classList.add('todolist__list');
  tasks.forEach(element => {
    // 如果时间戳不等于任务的时间戳，那就添加时间戳
    if (indexTime !== element.taskTime) {
      indexTime = element.taskTime;

      const timeStampHTML = timeStampTemplate(element);
      taskList.appendChild(timeStampHTML);
    }
    // 添加任务条
    const taskItemHTML = taskItemTemplate(element);
    taskList.appendChild(taskItemHTML);
  });

  taskLists.innerHTML = '';
  taskLists.appendChild(taskList);

  // 首任务聚焦
  if (taskList.firstChild) {
    taskList.firstChild.nextSibling.classList.add('todolist__focus');
    // 默认展示最新一项任务的详情
    db.showDetail(tasks[length]._id);
  } else {
    clearDetail();
  }
}

function renderBySearch({input, result}) {
  let indexTime;
  const taskLists = document.querySelector('.todolist__tasks');
  const taskList = document.createElement('ul');
  taskList.classList.add('todolist__list');

  result.rows.forEach(element => {
    element = element.doc;

    if (element.title && element.title.indexOf(input) !== -1) {
      // 如果时间戳不等于任务的时间戳，那就添加时间戳
      if (indexTime !== element.taskTime) {
        indexTime = element.taskTime;
        taskList.appendChild(timeStampTemplate(element));
      }

      // 添加任务条
      const taskItemHTML = taskItemTemplate(element);
      taskList.appendChild(taskItemHTML);
    }
  });

  taskLists.innerHTML = '';
  taskLists.appendChild(taskList);

  // 首任务聚焦
  if (taskList.firstChild) {
    const firstTask = taskList.firstChild.nextSibling;
    firstTask.classList.add('todolist__focus');
    db.showDetail(firstTask.getAttribute('idnum'));
  } else {
    clearDetail();
  }
}

// 修改任务标题功能
function changeTaskTitle(e) {
  const taskTitle = e.target;
  if (taskTitle.tagName.toUpperCase() === 'SPAN') {
    const idNum = taskTitle.getAttribute('idnum');
    const newTitle = taskTitle.innerText;

    db.modifyTask(idNum, 'title', newTitle);
  }
}

// 任务已完成功能
function finishTask(e) {
  const target = e.target;
  const focusedTask = document.querySelector('.todolist__focus');

  if (target.classList.contains('icon__nofinish')) {
    const idNum = target.getAttribute('idnum');
    db.modifyTask(idNum, 'taskType', 'finish');

    const currentTask = target.parentNode.parentNode;
    isDeleteTimeStamp(currentTask);
    currentTask.remove();
    updateTaskDetail(currentTask, focusedTask);
  }
}

function isDeleteTimeStamp(currentTask) {
  const hasPrevTask = currentTask.previousSibling.classList.contains(
    'todolist__content',
  );
  const NextTask = currentTask.nextSibling;

  if (
    (!hasPrevTask && NextTask == null) ||
    (!hasPrevTask && !NextTask.classList.contains('todolist__content'))
  ) {
    currentTask.parentNode.removeChild(currentTask.previousSibling);
  }
}

function updateTaskDetail(currentTask, focusedTask) {
  const taskList = document.querySelector('.todolist__list');
  // 首任务聚焦
  if (taskList.firstChild) {
    // 删除的正好是焦点任务就重新聚焦
    if (currentTask === focusedTask) {
      const firstTask = taskList.firstChild.nextSibling;
      firstTask.classList.add('todolist__focus');
      db.showDetail(firstTask.getAttribute('idnum'));
    }
  } else {
    clearDetail();
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
      'todolist__content',
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
      clearDetail();
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

export {changeTaskTitle, finishTask, deleteTask, showTaskDetail};
