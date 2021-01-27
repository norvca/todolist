import sync from '../model/sync';
import { loginUser } from '../model/User';
import { useUserDB, backendDB as db } from '../model/db-interface';
import profilePopup from '../ui/popups/profile-popup';

function initApp(username: string, token: string): void {
  // Reset current task states
  localStorage.setItem('currentLevel', 'level-light');
  localStorage.setItem('currentType', 'work');

  profilePopup.showProfileIcon();
  useUserDB();
  sync.firstSync(loginUser.db, username, token);
  // TODO: 用 loginUser 则登录后不能立即渲染任务栏，切换成db就可以
  loginUser.searchByTaskType('work');
}

function reInitApp(): void {
  const dbName = localStorage.getItem('DB-name');
  const token = localStorage.getItem('CouchDB-auth');
  const username = localStorage.getItem('User-name');

  // Reset current task states
  localStorage.setItem('currentLevel', 'level-light');
  localStorage.setItem('currentType', 'work');

  if (dbName && token && username) {
    sync.reSync(loginUser.db);
    profilePopup.showProfileIcon();
    db.searchByTaskType('work');
  } else {
    db.searchByTaskType('work');
  }
}

export { initApp, reInitApp };
