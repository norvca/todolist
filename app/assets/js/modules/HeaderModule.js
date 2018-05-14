// 定义页面头部处理程序模块
var headerModule = (function() {
  // 加载数据库模块
  var db = require("./DB");
  var HF = require("./HelperFunction");


  // 变量声明
  var randomContentNow = ["读完那本英文原著", "中午去睡个好觉", "日语入门学习", "尝试做些家常菜", "了解一些设计常识"];
  var randomLevel = ["bgc-light", "bgc-usual", "bgc-heavy"];
  var searchbox = document.querySelector(".site-header__search-box__content");
  // var level = document.querySelector(".icon__level");
  var theme = ["", "theme-green", "theme-purple", "theme-gradual"];
  var themeIconName = ["#icon-theme", "#icon-theme1", "#icon-theme2", "#icon-theme3"];
  var siteHeader = document.querySelector(".site-header");


  // 模块内各功能
  // 触发随机任务功能
  var randomTask = function(){
    var ContentIndex = parseInt(Math.random()*randomContentNow.length);
    var LevelIndex = parseInt(Math.random()*3);
    var typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
    db.randomThingsNow(randomContentNow[ContentIndex], randomLevel[LevelIndex]);
    db.showTypeThings("taskType", typeValue);
  };

  // 开启查找任务功能
  var openSearchTask =  function(e) {
    // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

    if(e.target.classList.contains("icon__search")) {
      HF.inActColor(e.target);
      HF.inActColor(HF.get_input());
      HF.inActColor(searchbox);
      HF.get_input().focus();
      HF.get_input().value = "";

      if(!HF.get_input().classList.contains("act-color")) {
        db.showTypeThings("taskType", typeValue);

        // 更新右侧任务详情，异步程序使用 promise
        db.returnFocusId("taskType", typeValue)
          .then(function(data) {
            db.showDetail(data);
          }).catch(function(err) {
            db.showDetail(err);
          });
      }
    }
  };


  // 查找任务功能
  var searchTask = function(e){
    if( e.target.classList.contains("act-color") ){
      db.searchThings(this.value);
    }
  };


  // 任务等级切换功能
  var changeLevel = function(){
    taskToggle();
    HF.get_input().focus();
  };


  // 等级切换函数
  function taskToggle(){
    if( HF.get_level().classList.contains("level-light") ) {
      HF.toggleLevel("level-light", "level-usual", "level", "bgc-usual");

    } else if ( HF.get_level().classList.contains("level-usual") ) {
      HF.toggleLevel("level-usual", "level-heavy", "level", "bgc-heavy");

    } else {
      HF.toggleLevel("level-heavy", "level-light", "level", "bgc-light");
    }
  }


  // 添加任务功能
  var addTask1 = function(){
    // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
    if( !HF.get_input().value ){
      return;
    } else {
      db.addThings();
      db.showTypeThings("taskType", typeValue);
      HF.get_input().value = "";
    }
  };


  // 按回车键添加任务功能
  var addTask2 = function(e) {
    // 兼容FF和IE和Opera
    var event = e || window.event;
    var key = event.which || event.keyCode || event.charCode;
    // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

    // 焦点在搜索栏并按回车
    if(document.activeElement.value) {
      if (key == 13 && document.activeElement.tagName.toUpperCase() === "INPUT") {
        db.addThings();
        db.showTypeThings("taskType", typeValue);
        HF.get_input().value = "";
      }
    }
  };


  // 切换主题功能
  var changeTheme = function(){
    var themeIcon = this.children[0].children[0];
    // 切换主题数组
    theme.push(theme.shift());
    themeIconName.push(themeIconName.shift());
    // 应用主题
    siteHeader.setAttribute("class", ("site-header "+ theme[0]));
    themeIcon.setAttribute("xlink:href", themeIconName[0]);
  };

  return {
    randomTask,
    openSearchTask,
    searchTask,
    changeLevel,
    addTask1,
    addTask2,
    changeTheme
  };

})();

module.exports = headerModule;