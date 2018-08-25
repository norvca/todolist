// 加载其他模块
import {helperFunction} from "../HelperFunction";

// 定义变量
const toggleLevel = helperFunction.toggleLevel;

// 有限状态机
const FSM = {
    green: {
        buttonPressed: function() {
            toggleLevel("level-light", "level-usual", "bgc-usual");
            this.state = FSM.purple;
        }
    },
    purple: {
        buttonPressed: function() {
            toggleLevel("level-usual", "level-heavy", "bgc-heavy");
            this.state = FSM.red;
        }
    },
    red: {
        buttonPressed: function() {
            toggleLevel("level-heavy", "level-light", "bgc-light");
            this.state = FSM.green;
        }
    }
}

// 控制等级的小圆点模块
class LevelDot {
    constructor() {
        this.state = FSM.green;
        this.button = helperFunction.get_level_element();
        this.event();
    }

    event() {
        this.button.addEventListener("click", () => {
            this.state.buttonPressed.call(this);
        });
    }
}

export default LevelDot;