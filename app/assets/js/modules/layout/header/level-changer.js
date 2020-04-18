let levels = ['level-light', 'level-usual', 'level-heavy'];
let levelColors = ['bgc-light', 'bgc-usual', 'bgc-heavy'];

function changeLevel() {
  levels = [levels[1], levels[2], levels[0]];
  levelColors = [levelColors[1], levelColors[2], levelColors[0]];

  const levelChangeBtn = document.querySelector('.icon__level');
  levelChangeBtn.setAttribute('class', `icon icon__level ${levels[0]}`);
  levelChangeBtn.setAttribute('level', levelColors[0]);
}

export {changeLevel};
