// 定义右侧详情模块
var detailModule = (function(){
  // 加载数据库模块
  var db = require("./DB");


  // 更新任务详情功能
  var refreshDetail = function(){
    var focusTask = document.querySelector(".todolist__focus");
    var detailID = parseInt( focusTask.getAttribute("id-num") );
    var detailContent = this.value;
    var type = "detail";
    db.updateDetail(detailID, type, detailContent);
  };

  return {
    refreshDetail
  };
})();

module.exports = detailModule;