// 加载其他模块
import {helperFunction} from "../HelperFunction";

// 定义变量
const toggleLevel = helperFunction.toggleLevel;
const levelDot = helperFunction.get_level_element();

// 任务等级分类
const levelStates = {
  green: {
    dotPressed: function() {
      toggleLevel("level-light", "level-usual", "bgc-usual");
      this.state = levelStates.purple;
    }
  },
  purple: {
    dotPressed: function() {
      toggleLevel("level-usual", "level-heavy", "bgc-heavy");
      this.state = levelStates.red;
    }
  },
  red: {
    dotPressed: function() {
      toggleLevel("level-heavy", "level-light", "bgc-light");
      this.state = levelStates.green;
    }
  }
};

// 转换小圆点等级的装置
class LevelChanger {
  constructor(levelDot, levelState) {
    this.state = levelState;
    this.levelDot = levelDot;
    this.event();
  }

  event() {
    this.levelDot.addEventListener("click", () => {
      this.state.dotPressed.call(this);
    });
  }
}

new LevelChanger(levelDot, levelStates.green);

export default LevelChanger;