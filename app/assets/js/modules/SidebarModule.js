// 定义页面左侧导航处理程序模块
var sidebarModule = (function() {
  // 加载数据库模块
  var db = require("./DB");

  // 变量声明
  var levelBox = [0,1,2];
  var modal = document.querySelector(".modal");


  // 模块内各功能
  // 左侧导航栏功能
  var navigation = function(e){
    var lis = document.querySelectorAll(".sidebar__list-type");
    var target = e.target;

    // 点击到了任务类别的话
    if( target.classList.contains("sidebar__list-type")) {
      lis.forEach(function(ele){
        ele.classList.remove("sidebar__act");
      });
      target.classList.add("sidebar__act");

      // 展示不同类型任务到页面
      var typeValue = target.getAttribute("taskType");
      db.showTypeThings("taskType", typeValue);

      // 更新右侧任务详情，异步程序使用 promise
      db.returnFocusId("taskType", typeValue)
        .then(function(data) {
          db.showDetail(data);
        }).catch(function(err) {
          db.showDetail(err);
        });
    }
    // 点击到了任务等级的话
    else if (target.classList.contains("sidebar__list-level")) {
      levelBox.push(levelBox.shift());
      var levels = target.children;
      var thisLevel = levels[levelBox[0]];
      var levelValue = thisLevel.getAttribute("level");

      // 去除 active 类名
      Array.prototype.forEach.call(levels, function(e){
        e.classList.remove("active");
      });
      // 给当前任务等级添加 active
      thisLevel.classList.add("active");
      db.showTypeThings("level", levelValue);

      // 更新右侧任务详情，异步程序使用 promise
      db.returnFocusId("level", levelValue)
        .then(function(data) {
          db.showDetail(data);
        }).catch(function(err) {
          db.showDetail(err);
        });
    }
  };


  // 显示删库模态框功能
  var showModalBox = function(){
    modal.classList.add("modal--visible");
  };

  return {
    navigation,
    showModalBox
  };

})();

module.exports = sidebarModule;

