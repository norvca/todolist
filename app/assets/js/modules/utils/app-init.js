import {firstSync, reSync} from '../database/sync';
import {userDB} from '../database/pouchDB';
import {useUserDB, backendDB as db} from '../database/db-interface';
import profilePopup from '../ui/popups/profile-popup';

function initApp(username, token) {
  // Reset current level to level light
  localStorage.setItem('currentLevel', 'level-light');

  profilePopup.showProfileIcon();
  useUserDB();
  firstSync(userDB.db, username, token);
  // TODO: 用 userDB 则登录后不能立即渲染任务栏，切换成db就可以
  userDB.renderByTaskType('work');
}

function reinitApp() {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const username = localStorage.getItem('User-name');

  // Reset current level to level light
  localStorage.setItem('currentLevel', 'level-light');

  if (dbName && token && username) {
    reSync(userDB.db);
    profilePopup.showProfileIcon();
    db.renderByTaskType('work');
  } else {
    db.renderByTaskType('work');
  }
}

export {initApp, reinitApp};
