import {firstSync, reSync} from '../database/sync';
import {userDB} from '../database/pouchDB';
import {useUserDB} from '../utils/db-interface';
import {backendDB as db} from './db-interface';
import {showProfile} from '../login/profile';

function initApp(username, token) {
  showProfile();
  useUserDB();
  firstSync(userDB.db, username, token);
  userDB.showTask('taskType', 'work');
}

function reinitApp() {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const username = localStorage.getItem('User-name');

  if (dbName && token && username) {
    reSync(userDB.db);
    showProfile();
    db.showTask('taskType', 'work');
  }
}

export {initApp, reinitApp};
