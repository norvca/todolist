let levelArr = ['level-light', 'level-usual', 'level-heavy'];
let levelColorArr = ['bgc-light', 'bgc-usual', 'bgc-heavy'];

function changeLevel() {
  alterLevel();
  useLevel();
}

function alterLevel() {
  levelArr = [...levelArr.slice(1), ...levelArr.slice(0, 1)];
  levelColorArr = [...levelColorArr.slice(1), ...levelColorArr.slice(0, 1)];
}

function useLevel() {
  const levelChangeBtn = document.querySelector('.icon__level');
  levelChangeBtn.setAttribute('class', `icon icon__level ${levelArr[0]}`);
  levelChangeBtn.setAttribute('level', levelColorArr[0]);
}

export {changeLevel};
