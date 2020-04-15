import {hexedDBame} from '../utils/hex-encode';
import PouchDB from 'pouchdb';
import {userDB} from './pouchDB';
import api from '../api/urls';

const syncState = document.querySelector('.todolist__sync-state');
let syncHandler;

function firstSync(db, username, token) {
  const dbName = hexedDBame(username);

  let remoteDB = new PouchDB(api.syncUrl, {
    fetch: function (url, opts) {
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true,
  });

  syncHandler = PouchDB.sync(db, remoteDB, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true,
  })
    .on('active', function (info) {
      // replication was resumed
      console.log(info);
      syncState.innerText = '与云端硬盘同步数据中...';
    })
    .on('change', function (change) {
      // yo, something changed!
      console.log(change);
      userDB.showCurrentTask();
      syncState.innerText = '数据同步完成!';
    })
    .on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })

    .on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log(err);
      // Token过期失效后退出持续同步请求
      localStorage.clear();
    });
}

function reSync(db) {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');

  let remoteDB = new PouchDB(api.syncUrl, {
    fetch: function (url, opts) {
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true,
  });

  syncHandler = PouchDB.sync(db, remoteDB, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true,
  })
    .on('active', function (info) {
      // replication was resumed
      console.log(info);
      syncState.innerText = '与云端硬盘同步数据中...';
    })
    .on('change', function (change) {
      // yo, something changed!
      console.log(change);
      userDB.showCurrentTask();
      syncState.innerText = '数据同步完成!';
    })
    .on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })
    .on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log(err);
      // Token过期失效后退出持续同步请求
      localStorage.clear();
    });
}

export {firstSync, reSync, syncHandler};
