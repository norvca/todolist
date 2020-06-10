import {firstSync, reSync} from '../database/sync';
import {userDB} from '../database/pouchDB';
import {useUserDB, backendDB as db} from '../database/db-interface';
import {showProfile} from '../layout/popups/profile-popup';

function initApp(username, token) {
  showProfile();
  useUserDB();
  firstSync(userDB.db, username, token);
  userDB.sortByTaskType('work');
}

function reinitApp() {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const username = localStorage.getItem('User-name');

  if (dbName && token && username) {
    reSync(userDB.db);
    showProfile();
    db.sortByTaskType('work');
  } else {
    db.sortByTaskType('work');
  }
}

export {initApp, reinitApp};
