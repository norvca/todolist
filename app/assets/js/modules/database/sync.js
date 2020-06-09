import {hexedDBame} from '../utils/hex-encode';
import PouchDB from 'pouchdb';
import {userDB} from './pouchDB';
import api from '../api/urls';

let syncHandler;

// 登录账号后第一次同步
function firstSync(db, username, token) {
  const dbName = hexedDBame(username);
  const remoteDB = getRemoteDB(api, dbName, token);

  syncHandler = getSyncHandler(db, remoteDB);
}

// 已经登陆则自动同步
function reSync(db) {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const remoteDB = getRemoteDB(api, dbName, token);

  syncHandler = getSyncHandler(db, remoteDB);
}

// 连接服务端数据库
function getRemoteDB(api, dbName, token) {
  return new PouchDB(api.syncUrl, {
    fetch: function (url, opts) {
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true,
  });
}

// 获取数据同步状态
function getSyncHandler(db, remoteDB) {
  const syncState = document.querySelector('.todolist__sync-state');

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
      userDB.sortByCurrentTask();
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

export {firstSync, reSync, syncHandler};
