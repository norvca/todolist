import {firstSync, reSync} from '../database/sync';
import {userDB} from '../database/pouchDB';
import {useUserDB, backendDB as db} from '../database/db-interface';
import {showProfile} from '../ui/popups/profile-popup';

function initApp(username, token) {
  showProfile();
  useUserDB();
  firstSync(userDB.db, username, token);
  userDB.renderByTaskType('work');
}

function reinitApp() {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const username = localStorage.getItem('User-name');

  if (dbName && token && username) {
    reSync(userDB.db);
    showProfile();
    db.renderByTaskType('work');
  } else {
    db.renderByTaskType('work');
  }
}

export {initApp, reinitApp};
