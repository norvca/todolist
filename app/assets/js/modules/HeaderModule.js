// 加载中间件模块
import {backendDB as db} from "./BackendDB";
import {helperFunction} from "./HelperFunction";

// 变量声明
const randomContentNow = ["读完那本英文原著", "中午去睡个好觉", "日语入门学习", "尝试做些家常菜", "了解一些设计常识"];
const randomLevel = ["bgc-light", "bgc-usual", "bgc-heavy"];
const searchbox = document.querySelector(".site-header__search-box__content");
const theme = ["", "theme-green", "theme-purple", "theme-gradual"];
const themeIconName = ["#icon-theme", "#icon-theme1", "#icon-theme2", "#icon-theme3"];
const siteHeader = document.querySelector(".site-header");
const input = helperFunction.get_input_element();
const level = helperFunction.get_level_element();
const inActColor = helperFunction.inActColor;
const toggleLevel = helperFunction.toggleLevel;


// 定义页面头部处理程序模块
const headerModule = {
    // 模块内各功能
    // 触发随机任务功能
    randomTask(){
        const ContentIndex = parseInt(Math.random()*randomContentNow.length);
        const LevelIndex = parseInt(Math.random()*3);
        const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
        db.addTask(randomContentNow[ContentIndex], randomLevel[LevelIndex]);
        db.showTask("taskType", typeValue);
    },

    // 开启查找任务功能
    openSearchTask(e) {
    // 获取左侧栏目对应事件类型
        const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

        if(e.target.classList.contains("icon__search")) {
            inActColor(e.target);
            inActColor(input);
            inActColor(searchbox);
            input.focus();
            input.value = "";

            if(!input.classList.contains("act-color")) {
                db.showTask("taskType", typeValue);
            }
        }
    },


    // 查找任务功能
    searchTask(e){
        if( e.target.classList.contains("act-color") ){
            db.searchTask(this.value);
        }
    },

    // 添加任务功能
    addTask1(){
    // 获取左侧栏目对应事件类型
        const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
        if( !input.value ){
            return;
        } else {
            db.addTask();
            db.showTask("taskType", typeValue);
            input.value = "";
        }
    },


    // 按回车键添加任务功能
    addTask2(event = window.event) {
        const key = event.which || event.keyCode || event.charCode;
        // 获取左侧栏目对应事件类型
        const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

        // 焦点在搜索栏并按回车
        if(document.activeElement.value) {
            if (key == 13 && document.activeElement.tagName.toUpperCase() === "INPUT") {
                db.addTask();
                db.showTask("taskType", typeValue);
                input.value = "";
            }
        }
    },


    // 切换主题功能
    changeTheme(){
        const themeIcon = this.children[0].children[0];
        // 切换主题数组
        theme.push(theme.shift());
        themeIconName.push(themeIconName.shift());
        // 应用主题
        siteHeader.setAttribute("class", ("site-header "+ theme[0]));
        themeIcon.setAttribute("xlink:href", themeIconName[0]);
    }
};


// 控制不同等级的小圆点
class LevelDot {
    constructor() {
        this.state = FSM.green;
        this.button = level;
    }

    init() {
        this.button.addEventListener("click", () => {
            this.state.buttonPressed.call(this);
        });
    }
}

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

const levelDot = new LevelDot();
levelDot.init();


export {headerModule};