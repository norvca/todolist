// 模块加载
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import { helperFunction } from '../utils/helper-function';

// 加载 PouchDB 插件
PouchDB.plugin(PouchdbFind);

// 定义变量
const toDayString = new Date().toString();
const input = helperFunction.get_input_element();
const level = helperFunction.get_level_element();
const section = document.querySelector('.todolist');
const detail = document.querySelector('.detail__paragraph');

// 创建数据库
let db = new PouchDB('localDB');
let visitorDB = new PouchDB('visitorDB');

// 数据库模型
class PouchClass {
  constructor(db) {
    this.db = db;
  }

  // 添加数据到数据库
  addTask(randomContent, ramdomLevel) {
    const title = input.value;
    const taskLevel = level.getAttribute('level');
    const taskTime = new Date().toLocaleDateString();
    const taskType = document
      .querySelector('.sidebar__act')
      .getAttribute('taskType');
    const taskWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
    let todo;
    // 有标题等参数即添加随机任务
    if (arguments[0]) {
      todo = {
        _id: new Date().toISOString(),
        title: randomContent,
        level: ramdomLevel,
        taskTime: taskTime,
        taskType: taskType,
        taskWeek: taskWeek,
        detail: null
      };
      // 没有参数则从input栏获取数据新建任务
    } else {
      todo = {
        _id: new Date().toISOString(),
        title: title,
        level: taskLevel,
        taskTime: taskTime,
        taskType: taskType,
        taskWeek: taskWeek,
        detail: null
      };
    }

    db.put(todo)
      .then(() => {
        console.log('添加到数据库成功！');
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 从数据库中读取数据然后渲染到页面
  showTask(indexType, value) {
    return db
      .createIndex({
        index: { fields: [indexType] }
      })
      .then(() => {
        // 按照任务类别来显示
        if (indexType === 'taskType') {
          return db
            .find({
              selector: {
                taskType: value
              },
              sort: [{ taskType: 'desc' }]
            })
            .then(result => {
              this.redrawTasksUI(result.docs);
            });

          // 按照任务等级来显示
        } else {
          return db
            .find({
              selector: {
                level: value
              },
              sort: [{ level: 'desc' }]
            })
            .then(result => {
              this.redrawTasksUI(result.docs);
            });
        }
      });
  }

  // 把任务条渲染到页面
  redrawTasksUI(tasks) {
    let indexTime = '';
    const taskList = document.createElement('ul');
    taskList.classList.add('todolist__list');
    tasks.forEach(element => {
      // 如果时间戳不等于任务的时间戳，那就添加时间戳
      if (indexTime !== element.taskTime) {
        indexTime = element.taskTime;
        taskList.appendChild(this.createTimeStamp(element));
      }
      // 添加任务条
      taskList.appendChild(this.createTaskItem(element));
    });

    section.innerHTML = '';
    section.appendChild(taskList);

    // 首任务聚焦
    if (taskList.firstChild) {
      taskList.firstChild.nextSibling.classList.add('todolist__focus');
      // 默认展示最新一项任务的详情
      this.showDetail(tasks[length]._id);
    } else {
      this.showDetail();
    }
  }

  // 组装任务条
  createTaskItem(element) {
    // 单项任务的属性设计
    const perTask = document.createElement('li');
    perTask.setAttribute('id', `things_${element._id}`);
    perTask.setAttribute('class', `todolist__content ${element.level}`);
    perTask.setAttribute('idnum', element._id);
    perTask.innerHTML = `<div><span class='todolist__title' contenteditable='true' idnum=${element._id}> ${element.title} </span></div>
            <div class='icon__todo'>
              <svg class='icon icon__nofinish' aria-hidden='true' name='search' idnum=${element._id}>
                <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>
                <use xlink:href='#icon-eglass-finish'></use>
              </svg>
              <svg class='icon icon__delete' aria-hidden='true' name='search' idnum=${element._id}>
                <use xlink:href='#icon-delete'></use>
              </svg>
            </div>`;

    return perTask;
  }

  // 组装时间戳
  createTimeStamp(element) {
    // 创建时间戳
    const taskTime = element.taskTime;
    const taskWeek = element.taskWeek;
    const timeStamp = document.createElement('li');
    timeStamp.classList.add('todolist__time');
    timeStamp.innerHTML =
      "<span class='todolist__week'>" +
      taskWeek +
      '</span>' +
      "<span class='todolist__date'>" +
      taskTime +
      '</span>';

    return timeStamp;
  }

  // 搜索数据库中的数据然后展示到页面
  searchTask(value) {
    let indexTime;
    const taskList = document.createElement('ul');
    taskList.classList.add('todolist__list');

    db.allDocs({
      include_docs: true,
      descending: true
    }).then(result => {
      result.rows.forEach(element => {
        element = element.doc;
        if (element.title && element.title.indexOf(value) !== -1) {
          // 如果时间戳不等于任务的时间戳，那就添加时间戳
          if (indexTime !== element.taskTime) {
            indexTime = element.taskTime;
            taskList.appendChild(this.createTimeStamp(element));
          }

          // 添加任务条
          taskList.appendChild(this.createTaskItem(element));
        }
      });

      section.innerHTML = '';
      section.appendChild(taskList);

      // 首任务聚焦
      if (taskList.firstChild) {
        const firstTask = taskList.firstChild.nextSibling;
        firstTask.classList.add('todolist__focus');
        this.showDetail(firstTask.getAttribute('idnum'));
      } else {
        this.showDetail();
      }
    });
  }

  // 修改任务数据
  modifyTask(idNum, attr, value) {
    db.get(idNum).then(doc => {
      doc[attr] = value;
      db.put(doc);
    });
  }

  // 显示右侧任务详情
  showDetail(id) {
    if (id) {
      db.get(id).then(doc => {
        const title = doc.title;
        const text = doc.detail;
        detail.previousElementSibling.innerText = title;
        detail.value = text;
        detail.placeholder = '添加任务详情...';
      });
    } else {
      detail.previousElementSibling.innerText = '';
      detail.value = '';
      detail.placeholder = '此分类目前没有任务哦~';
    }
  }

  // 删除全部数据
  deleteAllTasks() {
    db.allDocs()
      .then(result => {
        return Promise.all(
          result.rows.map(row => {
            return db.remove(row.id, row.value.rev);
          })
        );
      })
      .then(() => {
        // window.location.href = "index.html";
        section.innerHTML = '';
      })
      .catch(err => {
        console.log(err + '删除数据库失败！');
      });
  }
}

const localDB = new PouchClass(db);

export { localDB, visitorDB };
