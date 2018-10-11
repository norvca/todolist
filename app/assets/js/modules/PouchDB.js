// 模块加载
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import authentication from "pouchdb-authentication";
import {helperFunction} from "./HelperFunction";

// 加载 PouchDB 插件
PouchDB.plugin(PouchdbFind);
PouchDB.plugin(authentication);

// 定义变量
const toDayString = new Date().toString();
const input = helperFunction.get_input_element();
const level = helperFunction.get_level_element();
const section = document.querySelector(".todolist");
const detail = document.querySelector(".detail__paragraph");

// 创建数据库

// const db = new PouchDB("http://127.0.0.1:5984/todolist", {
//     skipSetup: true,
//     auth: {
//         username: "qwe",
//         password: "qwe"
//     }
// });

var db = new PouchDB("todolist");
// local.sync(db, {live: true, retry: true}).on('error', console.log.bind(console));

// db.signUp('1232222','eeee').then(function (reponse){
//     console.log(reponse)
// }).then(function (reponse) {
//     console.log(reponse)
//   // handle response
// }).catch(function (error) {
//     console.log(error)
//   // handle error
// });

// db.signup('batman', 'brucewayne', function (err, response) {
//   if (err) {
//     console.log(err)
//     if (err.name === 'conflict') {
//       // "batman" already exists, choose another username
//     } else if (err.name === 'forbidden') {
//       // invalid username
//     } else {
//       // HTTP error, cosmic rays, etc.
//     }
//   }
//   console.log(response)
// });

// db.login('batman', 'brucewayne', function (err, response) {
//   if (err) {
//     console.log(err)
//     if (err.name === 'unauthorized') {
//       // name or password incorrect
//     } else {
//       // cosmic rays, a meteor, etc.
//     }
//   }
//   console.log(response)
// });

// db.getSession(function (err, response) {
//   if (err) {
//     console.log(err)
//     // network error
//   } else if (!response.userCtx.name) {
//     // nobody's logged in
//   } else {
//     console.log(response)
//     // response.userCtx.name is the current user
//   }
// });


// db.getUser('batman', function (err, response) {
//   if (err) {
//     console.log(err)
//     if (err.name === 'not_found') {
//       // typo, or you don't have the privileges to see this user
//     } else {
//       // some other error
//     }
//   } else {
//     console.log(response)
//     // response is the user object
//   }
// });



// 数据库模块
const pouchDB = {
  // // 同步至远程couchDB
  // promise.then(function() {
  //   db.sync("https://a98401d4-bcd9-49e8-a062-249b780de5d4-bluemix:786692f7bb9a7e66433a5744d6328e6aef80f7acf3aaff322dca60e938a20328@a98401d4-bcd9-49e8-a062-249b780de5d4-bluemix.cloudant.com/todolist", {
  //     live:true,
  //     retry: true
  //   });
  // });

  // 添加数据到数据库
  addTask(randomContent, ramdomLevel) {
    const title = input.value;
    const taskLevel = level.getAttribute("level");
    const taskTime = new Date().toLocaleDateString();
    const taskType = document.querySelector(".sidebar__act").getAttribute("taskType");
    const taskWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
    let todo;
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


    db.put(todo).then(() => {
      console.log("添加到数据库成功！");
    }).catch(err => {console.log(err);});
  },


  // 从数据库中读取数据然后渲染到页面
  showTask(indexType, value) {
    return db.createIndex({
      index: {fields: [indexType]}
    }).then(() => {

      // 按照任务类别来显示
      if(indexType === "taskType") {
        return db.find({
          selector: {
            taskType: value
          },
          sort: [{taskType: "desc"}]
        }).then(result => {pouchDB.redrawTasksUI(result.docs);});

        // 按照任务等级来显示
      } else {
        return db.find({
          selector: {
            level: value
          },
          sort: [{level: "desc"}]
        }).then(result => {pouchDB.redrawTasksUI(result.docs);});
      }
    });
  },

  // 把任务条渲染到页面
  redrawTasksUI(tasks) {
    let indexTime = "";
    const taskList = document.createElement("ul");
    taskList.classList.add("todolist__list");
    tasks.forEach(element => {

      // 如果时间戳不等于任务的时间戳，那就添加时间戳
      if (indexTime !== element.taskTime) {
        indexTime = element.taskTime;
        taskList.appendChild(pouchDB.createTimeStamp(element));
      }
      // 添加任务条
      taskList.appendChild(pouchDB.createTaskItem(element));
    });

    section.innerHTML = "";
    section.appendChild(taskList);

    // 首任务聚焦
    if(taskList.firstChild) {
      taskList.firstChild.nextSibling.classList.add("todolist__focus");
      // 默认展示最新一项任务的详情
      pouchDB.showDetail(tasks[length]._id);
    } else {
      pouchDB.showDetail();
    }
  },

  // 组装任务条
  createTaskItem(element) {
    // 单项任务的属性设计
    const perTask = document.createElement("li");
    perTask.setAttribute("id", `things_${element._id}`);
    perTask.setAttribute("class", `todolist__content ${element.level}`);
    perTask.setAttribute("idnum", element._id);
    perTask.innerHTML = `<div><span class='todolist__title' contenteditable='true' idnum=${element._id}> ${element.title} </span></div>
            <div class='icon__todo'>
              <svg class='icon icon__nofinish' aria-hidden='true' name='search' idnum=${element._id}>
                <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>
                <use xlink:href='#icon-eglass-finish'></use>
              </svg>
              <svg class='icon icon__delete' aria-hidden='true' name='search' idnum=${element._id}>
                <use xlink:href='#icon-delete'></use>
              </svg>
            </div>`;

    return perTask;
  },

  // 组装时间戳
  createTimeStamp(element) {
    // 创建时间戳
    const taskTime = element.taskTime;
    const taskWeek = element.taskWeek;
    const timeStamp = document.createElement("li");
    timeStamp.classList.add("todolist__time");
    timeStamp.innerHTML = "<span class='todolist__week'>"+ taskWeek +"</span>" +
                          "<span class='todolist__date'>" + taskTime + "</span>";

    return timeStamp;
  },


  // 搜索数据库中的数据然后展示到页面
  searchTask(value) {
    let indexTime;
    const taskList = document.createElement("ul");
    taskList.classList.add("todolist__list");

    db.allDocs({
      include_docs: true,
      descending: true
    }).then(result => {
      result.rows.forEach(element => {

        element = element.doc;
        if( element.title && element.title.indexOf(value) !== -1 ) {

          // 如果时间戳不等于任务的时间戳，那就添加时间戳
          if (indexTime !== element.taskTime) {
            indexTime = element.taskTime;
            taskList.appendChild(pouchDB.createTimeStamp(element));
          }

          // 添加任务条
          taskList.appendChild(pouchDB.createTaskItem(element));
        }
      });

      section.innerHTML = "";
      section.appendChild(taskList);

      // 首任务聚焦
      if(taskList.firstChild) {
        const firstTask = taskList.firstChild.nextSibling;
        firstTask.classList.add("todolist__focus");
        pouchDB.showDetail(firstTask.getAttribute("idnum"));
      } else {
        pouchDB.showDetail();
      }
    });
  },


  // 修改任务数据
  modifyTask(idNum , attr, value) {
    db.get(idNum).then( doc => {
      doc[attr] = value;
      db.put(doc);
    });
  },


  // 显示右侧任务详情
  showDetail(id){
    if(id) {
      db.get(id).then( doc => {
        const title = doc.title;
        const text = doc.detail;
        detail.previousElementSibling.innerText = title;
        detail.value = text;
        detail.placeholder = "添加任务详情...";
      });
    } else {
      detail.previousElementSibling.innerText = "";
      detail.value = "";
      detail.placeholder = "此分类目前没有任务哦~";
    }
  },

  // 删除全部数据
  deleteAllTasks(){
    db.allDocs().then( result => {
      return Promise.all(result.rows.map( row => {
        return db.remove(row.id, row.value.rev);
      }));
    }).then( () => {
      // window.location.href = "index.html";
      section.innerHTML = "";
    }).catch( err => {
      console.log(err + "删除数据库失败！");
    });
  }
};


// 第一次载入页面就显示任务条
pouchDB.showTask("taskType", "work");

export {pouchDB};