// 加载中间件模块
import { backendDB as db } from '../database/db-interface';
import { clearDetail } from '../ui/detail';
import timeStampTemplate from '../templates/timeStamp-template';
import taskItemTemplate from '../templates/taskItem-template';
import pubsub from '../utils/pubsub';
import { Task } from '../interfaces/Task';

pubsub.on('renderByTaskType', renderTasks);
pubsub.on('renderByTaskLevel', renderTasks);
pubsub.on('renderBySearch', renderBySearch);

// 主界面模块
function renderTasks(tasks: Task[]) {
  let indexTime = '';
  const taskLists = document.querySelector('.todolist__tasks') as HTMLDivElement;
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
  const timeStampEl = taskList.firstChild as HTMLLIElement;
  if (timeStampEl) {
    const firstTaskEl = timeStampEl.nextSibling as HTMLLIElement;
    firstTaskEl.classList.add('todolist__focus');
    // 默认展示最新一项任务的详情
    db.showDetail(tasks[length]._id);
  } else {
    clearDetail();
  }
}

interface RenderBySearch {
  input: string;
  result: PouchDB.Core.AllDocsResponse<Record<never, never>>;
}

function renderBySearch({ input, result }: RenderBySearch) {
  let indexTime;
  const taskLists = document.querySelector('.todolist__tasks') as HTMLDivElement;
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
  const timeStampEl = taskList.firstChild as HTMLLIElement;
  if (timeStampEl) {
    const firstTaskEl = timeStampEl.nextSibling as HTMLLIElement;
    firstTaskEl.classList.add('todolist__focus');
    db.showDetail(firstTaskEl.getAttribute('idnum') as string);
  } else {
    clearDetail();
  }
}

// 修改任务标题功能
function changeTaskTitle(e: FocusEvent): void {
  const taskTitle = e.target as HTMLSpanElement;
  if (taskTitle.tagName.toUpperCase() === 'SPAN') {
    const idNum = taskTitle.getAttribute('idnum') as string;
    const newTitle = taskTitle.innerText;

    db.modifyTask(idNum, 'title', newTitle);
  }
}

// 任务已完成功能
function finishTask(e: MouseEvent): void {
  const target = e.target as SVGElement;
  const focusedTask = document.querySelector('.todolist__focus') as HTMLLIElement;

  if (target.classList.contains('icon__nofinish')) {
    const idNum = target.getAttribute('idnum') as string;
    db.modifyTask(idNum, 'taskType', 'finish');

    const currentTask = target.parentNode?.parentNode as HTMLLIElement;
    isDeleteTimeStamp(currentTask);
    currentTask.remove();
    updateTaskDetail(currentTask, focusedTask);
  }
}

function isDeleteTimeStamp(currentTask: HTMLLIElement) {
  const prevItem = currentTask.previousSibling as HTMLLIElement;
  const hasPrevTask = prevItem.classList.contains('todolist__content');
  const NextTask = currentTask.nextSibling as HTMLLIElement;

  if ((!hasPrevTask && NextTask == null) || (!hasPrevTask && !NextTask.classList.contains('todolist__content'))) {
    currentTask.parentNode?.removeChild(prevItem);
  }
}

function updateTaskDetail(currentTask: HTMLLIElement, focusedTask: HTMLLIElement) {
  const taskList = document.querySelector('.todolist__list') as HTMLUListElement;
  // 首任务聚焦
  if (taskList.firstChild) {
    // 删除的正好是焦点任务就重新聚焦
    if (currentTask === focusedTask) {
      const firstTask = taskList.firstChild.nextSibling as HTMLLIElement;
      firstTask.classList.add('todolist__focus');
      const idNum = firstTask.getAttribute('idnum') as string;
      db.showDetail(idNum);
    }
  } else {
    clearDetail();
  }
}

// 任务删除功能
function deleteTask(e: MouseEvent): void {
  const target = e.target as SVGElement;
  const taskList = document.querySelector('.todolist__list') as HTMLUListElement;
  const focusedTask = document.querySelector('.todolist__focus') as HTMLLIElement;
  if (target.classList.contains('icon__delete')) {
    const idNum = target.getAttribute('idnum') as string;
    db.modifyTask(idNum, 'taskType', 'bin');

    // 删除页面上的数据
    const ele = target.parentNode?.parentNode as HTMLLIElement;
    const privItem = ele.previousSibling as HTMLLIElement;
    const hasPrevTask = privItem.classList.contains('todolist__content');
    const NextTask = ele.nextSibling as HTMLLIElement;

    // 判断是否需要删除时间戳
    if ((!hasPrevTask && NextTask == null) || (!hasPrevTask && !NextTask.classList.contains('todolist__content'))) {
      ele.parentNode?.removeChild(privItem);
    }

    // 删除页面任务
    ele.remove();

    // 首任务聚焦
    if (taskList.firstChild) {
      // 删除的正好是焦点任务就重新聚焦
      if (ele === focusedTask) {
        const firstTask = taskList.firstChild.nextSibling as HTMLLIElement;
        firstTask.classList.add('todolist__focus');
        db.showDetail(firstTask.getAttribute('idnum') as string);
      }
    } else {
      clearDetail();
    }
  }
}

// 显示任务详情功能
function showTaskDetail(e: MouseEvent): void {
  const target = e.target as HTMLLIElement;

  if (target.classList.contains('todolist__content')) {
    const childNodes = target.parentNode?.childNodes as NodeListOf<HTMLLIElement>;
    const taskID = target.getAttribute('idnum') as string;
    childNodes.forEach(e => {
      e.classList.remove('todolist__focus');
    });

    target.classList.add('todolist__focus');
    db.showDetail(taskID);
  }
}

export { changeTaskTitle, finishTask, deleteTask, showTaskDetail };
