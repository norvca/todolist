import {hexedDBame} from '../utils/hex-encode';
import PouchDB from 'pouchdb';
import {userDB} from './pouchDB';
import * as api from '../api/urls';

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
    .on('change', function (change) {
      // yo, something changed!
      userDB.showCurrentTask();
      console.log(change);
    })
    .on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })
    .on('active', function (info) {
      // replication was resumed
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
    .on('change', function (change) {
      // yo, something changed!
      userDB.showCurrentTask();
      console.log(change);
    })
    .on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })
    .on('active', function (info) {
      // replication was resumed
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
