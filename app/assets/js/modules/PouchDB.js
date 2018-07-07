// 模块加载
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import {helperFunction} from "./HelperFunction";

// 数据库模块
const pouchDB = (function() {
  // 加载 PouchDB 插件
  PouchDB.plugin(PouchdbFind);

  // 定义变量
  var toDayString = new Date().toString();
  var input = helperFunction.get_input_element();
  var level = helperFunction.get_level_element();
  var section = document.querySelector(".todolist");
  var detail = document.querySelector(".detail__paragraph");


  // 创建数据库
  var db = new PouchDB("todolist");

  // // 同步至本地couchDB
  // promise.then(function() {
  //   db.sync("https://a98401d4-bcd9-49e8-a062-249b780de5d4-bluemix:786692f7bb9a7e66433a5744d6328e6aef80f7acf3aaff322dca60e938a20328@a98401d4-bcd9-49e8-a062-249b780de5d4-bluemix.cloudant.com/todolist", {
  //     live:true,
  //     retry: true
  //   });
  // });

  // 添加数据到数据库
  var addTask = function(randomContent, ramdomLevel) {
    var title = input.value;
    var taskLevel = level.getAttribute("level");
    var taskTime = new Date().toLocaleDateString();
    var taskType = document.querySelector(".sidebar__act").getAttribute("taskType");
    var taskWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
    var todo;
    // 有标题等参数即添加随机任务
    if(arguments[0]) {
      todo = {
        _id: new Date().toISOString(),
        title: randomContent,
        level: ramdomLevel,
        taskTime: taskTime,
        taskType: taskType,
        taskWeek: taskWeek,
        detail: null
      };
    // 没有参数则从input栏获取数据新建任务
    } else {
      todo = {
        _id: new Date().toISOString(),
        title: title,
        level: taskLevel,
        taskTime: taskTime,
        taskType: taskType,
        taskWeek: taskWeek,
        detail: null
      };
    }


    db.put(todo).then(function() {
      console.log("添加到数据库成功！");
    }).catch(function(err) {
      console.log(err);
    });
  };


  // 从数据库中读取数据然后渲染到页面
  var showTask = function(indexType, value) {
    return db.createIndex({
      index: {fields: [indexType]}
    }).then(function() {

      // 按照任务类别来显示
      if(indexType === "taskType") {
        return db.find({
          selector: {
            taskType: value
          },
          sort: [{taskType: "desc"}]
        }).then(function(result) {
          redrawTasksUI(result.docs);
        });

      // 按照任务等级来显示
      } else {
        return db.find({
          selector: {
            level: value
          },
          sort: [{level: "desc"}]
        }).then(function(result) {
          redrawTasksUI(result.docs);
        });
      }
    });
  };

  // 把任务条渲染到页面
  var redrawTasksUI = function(tasks) {
    var indexTime = "";
    var taskList = document.createElement("ul");
    taskList.classList.add("todolist__list");
    tasks.forEach(function(element) {

      // 如果时间戳不等于任务的时间戳，那就添加时间戳
      if (indexTime !== element.taskTime) {
        indexTime = element.taskTime;
        taskList.appendChild(createTimeStamp(element));
      }
      // 添加任务条
      taskList.appendChild(createTaskItem(element));
    });

    section.innerHTML = "";
    section.appendChild(taskList);

    // 首任务聚焦
    if(taskList.firstChild) {
      taskList.firstChild.nextSibling.classList.add("todolist__focus");
      // 默认展示最新一项任务的详情
      showDetail(tasks[length]._id);
    } else {
      showDetail();
    }
  };

  // 组装任务条
  var createTaskItem = function(element) {
    // 单项任务的属性设计
    var perTask = document.createElement("li");
    perTask.setAttribute("id", "things_"+ element._id);
    perTask.setAttribute("class", "todolist__content "+ element.level);
    perTask.setAttribute("idnum", element._id);
    perTask.innerHTML = "<div><span class='todolist__title' contenteditable='true' idnum="+element._id +">"+ element.title +"</span></div>"
           + "<div class='icon__todo'>"
           + "  <svg class='icon icon__nofinish' aria-hidden='true' name='search' idnum="+element._id +">"
           + "    <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>"
           + "    <use xlink:href='#icon-eglass-finish'></use>"
           + "  </svg>"
           + "  <svg class='icon icon__delete' aria-hidden='true' name='search' idnum="+element._id +">"
           + "   <use xlink:href='#icon-delete'></use>"
           + "  </svg>"
           + "</div>";

    return perTask;
  };

  // 组装时间戳
  var createTimeStamp = function(element) {
    // 创建时间戳
    var taskTime = element.taskTime;
    var taskWeek = element.taskWeek;
    var timeStamp = document.createElement("li");
    timeStamp.classList.add("todolist__time");
    timeStamp.innerHTML = "<span class='todolist__week'>"+ taskWeek +"</span>" +
                          "<span class='todolist__date'>" + taskTime + "</span>";

    return timeStamp;
  };


  // 搜索数据库中的数据然后展示到页面
  var searchTask = function(value) {
    var indexTime;
    var taskList = document.createElement("ul");
    taskList.classList.add("todolist__list");

    db.allDocs({
      include_docs: true,
      descending: true
    }).then(function(result) {
      result.rows.forEach(function(element) {
        element = element.doc;
        if( element.title && element.title.indexOf(value) !== -1 ) {

          // 如果时间戳不等于任务的时间戳，那就添加时间戳
          if (indexTime !== element.taskTime) {
            indexTime = element.taskTime;
            taskList.appendChild(createTimeStamp(element));
          }

          // 添加任务条
          taskList.appendChild(createTaskItem(element));
        }
      });

      section.innerHTML = "";
      section.appendChild(taskList);

      // 首任务聚焦
      if(taskList.firstChild) {
        var firstTask = taskList.firstChild.nextSibling;
        firstTask.classList.add("todolist__focus");
        showDetail(firstTask.getAttribute("idnum"));
      } else {
        showDetail();
      }
    });
  };


  // 修改任务数据
  var modifyTask = function(idNum , attr, value) {
    db.get(idNum).then(function(doc) {
      doc[attr] = value;
      db.put(doc);
    });
  };


  // 显示右侧任务详情
  var showDetail = function(id){
    if(id) {
      db.get(id).then(function(doc) {
        var title = doc.title;
        var text = doc.detail;
        detail.previousElementSibling.innerText = title;
        detail.value = text;
        detail.placeholder = "添加任务详情...";
      });
    } else {
      detail.previousElementSibling.innerText = "";
      detail.value = "";
      detail.placeholder = "此分类目前没有任务哦~";
    }
  };

  // 删除全部数据
  var deleteAllTasks = function(){
    db.allDocs().then(function (result) {
      return Promise.all(result.rows.map(function (row) {
        return db.remove(row.id, row.value.rev);
      }));
    }).then(function () {
      window.location.href = "index.html";
    }).catch(function (err) {
      console.log(err + "删除数据库失败！");
    });
  };

  // 第一次载入页面就显示任务条
  var promise = showTask("taskType", "work");

  return {
    addTask,
    showTask,
    searchTask,
    modifyTask,
    showDetail,
    deleteAllTasks
  };
})();

export {pouchDB};