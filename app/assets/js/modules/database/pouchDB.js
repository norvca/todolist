// 模块加载
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
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

  renderByTaskType(value) {
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

  renderByTaskLevel(value) {
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

  renderByCurrentTask() {
    const taskType = document
      .querySelector('.sidebar__act')
      .getAttribute('taskType');

    this.renderByTaskType(taskType);
  }

  renderBySearch() {
    return this.db
      .allDocs({
        include_docs: true,
        descending: true,
      })
      .then(result => {
        return result;
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
