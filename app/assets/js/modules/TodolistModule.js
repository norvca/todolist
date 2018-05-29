// 定义主任务界面模块
var todolistModule = (function() {
  // 加载数据库模块
  var db = require("./BackendDB");

  // 定义变量


  // 修改任务标题功能
  var changeTaskTitle = function(e){
    if(e.target.tagName.toUpperCase() === "SPAN"){
      var idNum = e.target.getAttribute("idnum");
      var newTitle = e.target.innerText;

      db.modifyTask(idNum, "title", newTitle);
    }
  };


  // 任务已完成功能
  var finishTask = function(e){
    var taskList = document.querySelector(".todolist__list");
    var focusedTask = document.querySelector(".todolist__focus");
    if(e.target.classList.contains("icon__nofinish")){
      var idNum = e.target.getAttribute("idnum");
      db.modifyTask(idNum, "taskType", "finish");
      // 删除页面上的数据
      var ele = e.target.parentNode.parentNode;
      var hasPrevTask = ele.previousSibling.classList.contains("todolist__content");
      var NextTask = ele.nextSibling;

      // 判断是否需要删除时间戳
      if( (!hasPrevTask && NextTask == null) || (!hasPrevTask && !NextTask.classList.contains("todolist__content")) ) {
        ele.parentNode.removeChild(ele.previousSibling);
      }

      // 删除页面任务
      ele.parentNode.removeChild(ele);
      // 首任务聚焦
      if(taskList.firstChild) {
        // 删除的正好是焦点任务就重新聚焦
        if(ele === focusedTask) {
          var firstTask = taskList.firstChild.nextSibling;
          firstTask.classList.add("todolist__focus");
          db.showDetail(firstTask.getAttribute("idnum"));
        }
      } else {
        db.showDetail();
      }
    }
  };


  // 任务删除功能
  var deleteTask = function(e){
    var taskList = document.querySelector(".todolist__list");
    var focusedTask = document.querySelector(".todolist__focus");
    if(e.target.classList.contains("icon__delete")){
      var idNum = e.target.getAttribute("idnum");
      db.modifyTask(idNum, "taskType", "bin");

      // 删除页面上的数据
      var ele = e.target.parentNode.parentNode;
      var hasPrevTask = ele.previousSibling.classList.contains("todolist__content");
      var NextTask = ele.nextSibling;

      // 判断是否需要删除时间戳
      if( (!hasPrevTask && NextTask == null) || (!hasPrevTask && !NextTask.classList.contains("todolist__content")) ) {
        ele.parentNode.removeChild(ele.previousSibling);
      }

      // 删除页面任务
      ele.parentNode.removeChild(ele);
      // 首任务聚焦
      if(taskList.firstChild) {
        // 删除的正好是焦点任务就重新聚焦
        if(ele === focusedTask) {
          var firstTask = taskList.firstChild.nextSibling;
          firstTask.classList.add("todolist__focus");
          db.showDetail(firstTask.getAttribute("idnum"));
        }
      } else {
        db.showDetail();
      }
    }
  };


  // 显示任务详情功能
  var showTaskDetail = function(e){
    if(e.target.classList.contains("todolist__content")){
      var childNodes = e.target.parentNode.childNodes;
      var taskID = e.target.getAttribute("idnum");
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

