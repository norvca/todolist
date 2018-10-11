// 加载其他模块
import {helperFunction} from "../HelperFunction";

// 定义变量
const toggleLevel = helperFunction.toggleLevel;

// 任务等级分类
const levelStates = {
    green: {
        buttonPressed: function() {
            toggleLevel("level-light", "level-usual", "bgc-usual");
            this.state = levelStates.purple;
        }
    },
    purple: {
        buttonPressed: function() {
            toggleLevel("level-usual", "level-heavy", "bgc-heavy");
            this.state = levelStates.red;
        }
    },
    red: {
        buttonPressed: function() {
            toggleLevel("level-heavy", "level-light", "bgc-light");
            this.state = levelStates.green;
        }
    }
}

// 转换小圆点等级的装置
class LevelChanger {
    constructor() {
        this.state = levelStates.green;
        this.button = helperFunction.get_level_element();
        this.event();
    }

    event() {
        this.button.addEventListener("click", () => {
            this.state.buttonPressed.call(this);
        });
    }
}

export default LevelChanger;