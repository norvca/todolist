// 定义主任务界面模块
var todolistModule = (function() {
  // 加载数据库模块
  var db = require("./DB");


  // 修改任务标题功能
  var changeTaskTitle = function(e){
    if(e.target.tagName.toUpperCase() === "SPAN"){
      var idNum = parseInt( e.target.getAttribute("id-num") );
      var newText = e.target.innerText;

      db.modifyThings(idNum, "title", newText);
    }
  };


  // 任务已完成功能
  var finishTask = function(e){
    if( e.target.classList.contains("icon__nofinish")){
      var idNum = parseInt( e.target.getAttribute("id-num") );
      db.modifyThings(idNum, "taskType", "finish");

      // 删除页面上的数据
      var ele = document.querySelector("#things_"+ idNum);
      ele.parentNode.removeChild(ele);
    }
  };


  // 任务删除功能
  var deleteTask = function(e){
    if(e.target.classList.contains("icon__delete")){
      var idNum = parseInt( e.target.getAttribute("id-num") );
      db.modifyThings(idNum, "taskType", "bin");

      // 删除页面上的数据
      var ele = document.querySelector("#things_"+ idNum);
      ele.parentNode.removeChild(ele);
    }
  };


  // 显示任务详情功能
  var showTaskDetail = function(e){
    if(e.target.classList.contains("todolist__content")){
      var childNodes = e.target.parentNode.childNodes;
      var taskID = parseInt( e.target.getAttribute("id-num") );
      childNodes.forEach(function(e){
        e.classList.remove("todolist__focus");
      });

      e.target.classList.add("todolist__focus");
      db.showDetail(taskID);
    }
  };

  return {
    changeTaskTitle,
    finishTask,
    deleteTask,
    showTaskDetail
  };

})();

module.exports = todolistModule;

