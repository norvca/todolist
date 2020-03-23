import { hexedDBame } from '../utils/hex-encode';
import PouchDB from 'pouchdb';
import { userDB } from './pouchDB';

function firstSync(db, username, token) {
  const dbName = hexedDBame(username);

  let remoteDB = new PouchDB('http://192.168.206.141:4000', {
    fetch: function(url, opts) {
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true
  });

  PouchDB.sync(db, remoteDB, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true
  })
    .on('change', function(change) {
      // yo, something changed!
      userDB.showCurrentTask();
      console.log(change);
    })
    .on('paused', function(info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })
    .on('active', function(info) {
      // replication was resumed
      console.log(info);
    })
    .on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err);
    });
}

function reSync(db) {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');

  let remoteDB = new PouchDB('http://192.168.206.141:4000', {
    fetch: function(url, opts) {
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true
  });

  console.log(remoteDB);

  const syncing = PouchDB.sync(db, remoteDB, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true
  })
    .on('change', function(change) {
      // yo, something changed!
      userDB.showCurrentTask();
      console.log(change);
    })
    .on('paused', function(info) {
      // replication was paused, usually because of a lost connection
      console.log(info);
    })
    .on('active', function(info) {
      // replication was resumed
      console.log(info);
    })

    .on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err);
      // 出错后退出持续同步请求
      // localStorage.clear();
    });

  console.log('远程同步');
}

export { firstSync, reSync };
