// 加载中间件模块
import {backendDB as db} from '../utils/db-interface';

// 定义页面左侧导航处理程序模块
// 左侧导航栏功能
function navigate(e) {
  const target = e.target;
  target.classList.contains('sidebar__list-type')
    ? navigateByType(target)
    : navigateByLevel(target);
}

// 按任务类型导航
function navigateByType(target) {
  const lis = document.querySelectorAll('.sidebar__list-type');
  lis.forEach(ele => {
    ele.classList.remove('sidebar__act');
  });
  target.classList.add('sidebar__act');

  const typeValue = target.getAttribute('taskType');
  db.sortByTaskType(typeValue);
}

const levelBox = [0, 1, 2];

// 按任务等级导航
function navigateByLevel(target) {
  levelBox.push(levelBox.shift());

  const levelArr = target.children;
  Array.from(levelArr, e => {
    e.classList.remove('active');
  });

  const currentLevel = levelArr[levelBox[0]];
  currentLevel.classList.add('active');

  const levelValue = currentLevel.getAttribute('level');
  db.sortByTaskLevel(levelValue);
}

export {navigate};
