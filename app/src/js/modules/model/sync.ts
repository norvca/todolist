import { hexedDBName } from '../utils/hex-encode';
import PouchDB from 'pouchdb';
import api from '../api/urls';
import { IUrls } from '../interfaces/IUrls';

class Sync {
  syncHandler: PouchDB.Replication.Sync<Record<never, never>> | undefined;

  // 登录账号后第一次同步
  firstSync(db: PouchDB.Database, username: string, token: string): void {
    const dbName = hexedDBName(username);
    const remoteDB = this.getRemoteDB(api, dbName, token);

    this.syncHandler = this.getSyncHandler(db, remoteDB);
  }

  // 已经登陆则自动同步
  reSync(db: PouchDB.Database): void {
    const dbName = localStorage.getItem('DB-name') as string;
    const token = localStorage.getItem('CouchDB-auth') as string;
    const remoteDB = this.getRemoteDB(api, dbName, token);

    this.syncHandler = this.getSyncHandler(db, remoteDB);
  }

  // 连接服务端数据库
  getRemoteDB(api: IUrls, dbName: string, token: string): PouchDB.Database {
    return new PouchDB(api.syncUrl, {
      fetch: function (url, opts) {
        opts.headers?.set('X-CouchDB-dbName', dbName);
        opts.headers?.set('X-Auth-CouchDB-Token', token);
        opts.credentials = 'omit';
        return PouchDB.fetch(url, opts);
      },
      skip_setup: true,
    });
  }

  // 获取数据同步状态
  getSyncHandler(db: PouchDB.Database, remoteDB: PouchDB.Database): PouchDB.Replication.Sync<Record<never, never>> {
    const syncState = document.querySelector('.todolist__sync-state') as HTMLDivElement;

    return PouchDB.sync(db, remoteDB, {
      live: true,
      heartbeat: false,
      timeout: false,
      retry: true,
    })
      .on('active', function (info) {
        console.log(info);
        syncState.innerText = '与云端硬盘同步数据中...';
      })
      .on('change', function (change) {
        console.log(change);
        // Todo: 登录同步完成后需渲染 todoList
        syncState.innerText = '数据同步完成!';
      })
      .on('paused', function (info) {
        console.log(info);
      })
      .on('error', function (err) {
        console.log(err);
        // Token过期失效后退出持续同步请求
        localStorage.clear();
      });
  }
}

const sync = new Sync();
export default sync;
