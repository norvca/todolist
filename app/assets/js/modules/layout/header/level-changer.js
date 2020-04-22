let levelArr = ['level-light', 'level-usual', 'level-heavy'];
let levelColorArr = ['bgc-light', 'bgc-usual', 'bgc-heavy'];

function changeLevel() {
  alterLevel();
  useLevel();
}

function alterLevel() {
  levelArr = [levelArr[1], levelArr[2], levelArr[0]];
  levelColorArr = [levelColorArr[1], levelColorArr[2], levelColorArr[0]];
}

function useLevel() {
  const levelChangeBtn = document.querySelector('.icon__level');
  levelChangeBtn.setAttribute('class', `icon icon__level ${levelArr[0]}`);
  levelChangeBtn.setAttribute('level', levelColorArr[0]);
}

export {changeLevel};
