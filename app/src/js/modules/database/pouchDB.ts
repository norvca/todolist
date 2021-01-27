// 模块加载
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import TaskCreator from '../utils/task-creator';
import { DBModel } from '../interfaces/DBModel';
import { PromiseDetailInfo } from '../interfaces/Detail';

// 加载 PouchDB 插件
PouchDB.plugin(PouchdbFind);

// 创建数据库
const pouchUser = new PouchDB('userDB');
const pouchVisitor = new PouchDB('visitorDB');

// 数据库模型
class PouchClass implements DBModel {
  private taskCreator;

  constructor(public db: PouchDB.Database) {
    this.db = db;
    this.taskCreator = new TaskCreator();
  }

  // 添加数据到数据库
  addTask(): void {
    const task = this.taskCreator.createTask();

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
  addRandomTask(): void {
    const task = this.taskCreator.createRandomTask();

    this.db
      .put(task)
      .then(() => {
        console.log('添加到数据库成功！');
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchByTaskType(value: string): Promise<PouchDB.Core.ExistingDocument<Record<never, never>>[]> {
    return this.db
      .createIndex({
        index: { fields: ['taskType'] },
      })
      .then(() => {
        return this.db
          .find({
            selector: {
              taskType: value,
            },
            sort: [{ taskType: 'desc' }],
          })
          .then(result => {
            return result.docs;
          });
      });
  }

  searchByTaskLevel(value: string): Promise<PouchDB.Core.ExistingDocument<Record<never, never>>[]> {
    return this.db
      .createIndex({
        index: { fields: ['level'] },
      })
      .then(() => {
        return this.db
          .find({
            selector: {
              level: value,
            },
            sort: [{ level: 'desc' }],
          })
          .then(result => {
            return result.docs;
          });
      });
  }

  searchByCurrentTask(): void {
    const currentTaskLiElement = document.querySelector('.sidebar__act') as HTMLLIElement;
    const taskType = currentTaskLiElement.getAttribute('taskType') as string;

    this.searchByTaskType(taskType);
  }

  searchAll(): Promise<PouchDB.Core.AllDocsResponse<Record<never, never>>> {
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
  modifyTask(idNum: string, attr: string, value: string): void {
    this.db.get(idNum).then(doc => {
      doc[attr] = value;
      this.db.put(doc);
    });
  }

  // 显示右侧任务详情
  showDetail(id: string): PromiseDetailInfo {
    return this.db.get(id).then(({ title, detail }) => {
      return { title, detail };
    });
  }

  // 删除全部数据
  deleteAllTasks(): void {
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

export { userDB, visitorDB, PouchClass };
