// 模块加载
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import helperFunction from '../utils/helper-function';
import taskItemTemplate from '../templates/taskItem-template';
import timeStampTemplate from '../templates/timeStamp-template';
import taskCreater from '../utils/task-creater';

// 加载 PouchDB 插件
PouchDB.plugin(PouchdbFind);

// 创建数据库
let pouchUser = new PouchDB('userDB');
let pouchVisitor = new PouchDB('visitorDB');

// 数据库模型
class PouchClass {
  constructor(db) {
    this.db = db;
    this.toDayString = new Date().toString();
    this.input = helperFunction.get_input_element();
    this.level = helperFunction.get_level_element();
    this.taskLists = document.querySelector('.todolist__tasks');
    this.detail = document.querySelector('.detail__paragraph');
    this.detailTitle = document.querySelector('.detail__title');
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
            this.redrawTasksUI(result.docs);
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
            this.redrawTasksUI(result.docs);
          });
      });
  }

  showCurrentTask() {
    const taskType = document
      .querySelector('.sidebar__act')
      .getAttribute('taskType');

    this.sortByTaskType(taskType);
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

        const timeStampHTML = timeStampTemplate(element);
        taskList.appendChild(timeStampHTML);
      }
      // 添加任务条
      const taskItemHTML = taskItemTemplate(element);
      taskList.appendChild(taskItemHTML);
    });

    this.taskLists.innerHTML = '';
    this.taskLists.appendChild(taskList);

    // 首任务聚焦
    if (taskList.firstChild) {
      taskList.firstChild.nextSibling.classList.add('todolist__focus');
      // 默认展示最新一项任务的详情
      this.showDetail(tasks[length]._id);
    } else {
      this.showDetail();
    }
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
          this.showDetail(firstTask.getAttribute('idnum'));
        } else {
          this.showDetail();
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
    if (id) {
      this.db.get(id).then(doc => {
        const title = doc.title;
        const text = doc.detail;
        this.detailTitle.innerText = title;
        this.detail.value = text;
        this.detail.placeholder = '添加任务详情...';
      });
    } else {
      this.detailTitle.innerText = '';
      this.detail.value = '';
      this.detail.placeholder = '此分类目前没有任务哦~';
    }
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
      .then(() => {
        helperFunction.freshPage();
      })
      .catch(err => {
        console.log(err + '删除数据库失败！');
      });
  }
}

const userDB = new PouchClass(pouchUser);
const visitorDB = new PouchClass(pouchVisitor);

export {userDB, visitorDB};
