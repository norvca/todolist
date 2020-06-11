// 模块加载
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import taskItemTemplate from '../templates/taskItem-template';
import timeStampTemplate from '../templates/timeStamp-template';
import taskCreater from '../utils/task-creater';
import {clearDetail} from '../ui/detail';
import {backendDB} from './db-interface';

// 加载 PouchDB 插件
PouchDB.plugin(PouchdbFind);

// 创建数据库
let pouchUser = new PouchDB('userDB');
let pouchVisitor = new PouchDB('visitorDB');

// 数据库模型
class PouchClass {
  constructor(db) {
    this.db = db;
    this.taskLists = document.querySelector('.todolist__tasks');
    this.taskCreater = taskCreater;
  }

  // 添加数据到数据库
  addTask() {
    const task = this.taskCreater.createTask();

    this.db
      .put(task)
      .then(() => {
        console.log('添加到数据库成功！');
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 添加数据到数据库
  addRandomTask() {
    const task = this.taskCreater.createRandomTask();

    this.db
      .put(task)
      .then(() => {
        console.log('添加到数据库成功！');
      })
      .catch(err => {
        console.log(err);
      });
  }

  sortByTaskType(value) {
    return this.db
      .createIndex({
        index: {fields: ['taskType']},
      })
      .then(() => {
        return this.db
          .find({
            selector: {
              taskType: value,
            },
            sort: [{taskType: 'desc'}],
          })
          .then(result => {
            return result.docs;
          });
      });
  }

  sortByTaskLevel(value) {
    return this.db
      .createIndex({
        index: {fields: ['level']},
      })
      .then(() => {
        return this.db
          .find({
            selector: {
              level: value,
            },
            sort: [{level: 'desc'}],
          })
          .then(result => {
            return result.docs;
          });
      });
  }

  sortByCurrentTask() {
    const taskType = document
      .querySelector('.sidebar__act')
      .getAttribute('taskType');

    this.sortByTaskType(taskType);
  }

  // 搜索数据库中的数据然后展示到页面
  searchTask(value) {
    let indexTime;
    const taskList = document.createElement('ul');
    taskList.classList.add('todolist__list');
    console.log(this);

    this.db
      .allDocs({
        include_docs: true,
        descending: true,
      })
      .then(result => {
        result.rows.forEach(element => {
          element = element.doc;

          if (element.title && element.title.indexOf(value) !== -1) {
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

        this.taskLists.innerHTML = '';
        this.taskLists.appendChild(taskList);

        // 首任务聚焦
        if (taskList.firstChild) {
          const firstTask = taskList.firstChild.nextSibling;
          firstTask.classList.add('todolist__focus');
          backendDB.showDetail(firstTask.getAttribute('idnum'));
        } else {
          clearDetail();
        }
      });
  }

  // 修改任务数据
  modifyTask(idNum, attr, value) {
    this.db.get(idNum).then(doc => {
      doc[attr] = value;
      this.db.put(doc);
    });
  }

  // 显示右侧任务详情
  showDetail(id) {
    return this.db.get(id).then(({title, detail}) => {
      return {title, detail};
    });
  }

  // 删除全部数据
  deleteAllTasks() {
    this.db
      .allDocs()
      .then(result => {
        return Promise.all(
          result.rows.map(row => {
            return this.db.remove(row.id, row.value.rev);
          }),
        );
      })
      .catch(err => {
        console.log(err + '删除数据库失败！');
      });
  }
}

const userDB = new PouchClass(pouchUser);
const visitorDB = new PouchClass(pouchVisitor);

export {userDB, visitorDB};
