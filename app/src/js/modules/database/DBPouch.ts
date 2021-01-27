import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import { IDatabase } from '../interfaces/IDatabase';
import { ITask } from '../interfaces/ITask';
import { PromiseDetailInfo } from '../interfaces/IDetail';

PouchDB.plugin(PouchdbFind);

export default class DBPouch implements IDatabase {
  constructor(private db: PouchDB.Database) {}

  insert(task: ITask): void {
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

  modifyTask(idNum: string, attr: string, value: string): void {
    this.db.get(idNum).then(doc => {
      doc[attr] = value;
      this.db.put(doc);
    });
  }

  searchDetail(id: string): PromiseDetailInfo {
    return this.db.get(id).then(({ title, detail }) => {
      return { title, detail };
    });
  }

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
