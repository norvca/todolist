// 变量声明
const toDayString = new Date().toString();
const section = document.querySelector(".todolist");
const input = document.querySelector(".site-header__search-box__input");
const level = document.querySelector(".icon__level");
const detail = document.querySelector(".detail__paragraph");
const db;

// 数据库模块
const DB = {
  // 初始化数据库
  initDB(){
    // 打开数据库
    const request = window.indexedDB.open("todoAPP", 1);

    // 成功
    request.onsuccess = function(){
      console.log("开启数据库成功！");
      db = this.result;
      showTypeThings("taskType", "work");

      // 更新右侧任务详情，异步程序使用 promise
      returnFocusId("taskType", "work")
        .then(function(data) {
          showDetail(data);
        }).catch(function(err) {
          showDetail(err);
        });
    };

    // 失败
    request.onoerror = function(){
      console.log("ERROR: 开启数据库失败！");
    };

    // 建立事件库与索引
    request.onupgradeneeded = function(){
      db = this.result;

      // 建立事件仓库
      if(!db.objectStoreNames.contains("todoDB")) {
        // 创建对象
        const store = db.createObjectStore("todoStore", {keyPath: "id", autoIncrement: true});
        // 创建索引
        store.createIndex("id", "id", {unique: true});
        store.createIndex("title", "title", {unique: false});
        store.createIndex("taskType", "taskType", {unique: false});
        store.createIndex("level", "level", {unique: false});
        store.createIndex("taskTime", "taskTime", {unique: false});
        store.createIndex("taskWeek", "taskWeek", {unique: false});
      }
    };
  },


  // 添加数据到数据库
  addThings(){
    const title = input.value;
    const taskLevel = level.getAttribute("level");
    const taskTime = new Date().toLocaleDateString();
    const taskWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
    const taskType = document.querySelector(".sidebar__act").getAttribute("taskType");
    const transaction = db.transaction(["todoStore"], "readwrite");
    // 请求数据对象
    const store = transaction.objectStore("todoStore");

    // 定义 todoStore
    const todos = {
      title: title,
      detail: null,
      level: taskLevel,
      taskTime: taskTime,
      taskType: taskType,
      taskWeek: taskWeek
    };

    // 添加事件
    const request = store.add(todos);

    // 更新右侧任务详情，异步程序使用 promise
    returnFocusId("taskType", taskType)
      .then(function(data) {
        showDetail(data);
      }).catch(function(err) {
        showDetail(err);
      });

    // 添加成功与失败
    request.onsuccess = function(){
      console.log("事件添加到数据库成功!");
    };

    request.onerror = function(){
      console.log("事件添加到数据库失败!");
    };
  },


  // 展示不同类型的数据
  showTypeThings(indexType, type){
    const transaction = db.transaction(["todoStore"], "readonly");
    const store = transaction.objectStore("todoStore");
    const taskType = store.index(indexType);
    const boundKeyRange = IDBKeyRange.only(type);
    const toDay = new Date().toLocaleDateString();
    const eachDay = document.querySelector(".todolist__eachday");
    const indexTime = "";
    const taskList = document.createElement("ul");
    taskList.classList.add("todolist__list");

    // 用游标来搜索与展示每一条任务
    taskType.openCursor(boundKeyRange, "prev").onsuccess = function(e){
      const cursor = e.target.result;
      if(cursor){
        const taskTime = cursor.value.taskTime;
        const taskWeek = cursor.value.taskWeek;
        const perTask = document.createElement("li");
        const timeStamp = document.createElement("li");

        // 创建时间戳
        timeStamp.classList.add("todolist__time");
        timeStamp.innerHTML = "<span class='todolist__week'>"+ taskWeek +"</span>" +
                              "<span class='todolist__date'>" + taskTime + "</span>"

        // 单项任务的属性设计
        perTask.setAttribute("id", "things_"+ cursor.value.id);
        perTask.setAttribute("class", "todolist__content "+ cursor.value.level);
        perTask.setAttribute("id-num", cursor.value.id);
        perTask.innerHTML = "<div><span class='todolist__title' contenteditable='true' id-num="+cursor.value.id +">"+ cursor.value.title +"</span></div>"
               + "<div class='icon__todo'>"
               + "  <svg class='icon icon__nofinish' aria-hidden='true' name='search' id-num="+cursor.value.id +">"
               + "    <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>"
               + "    <use xlink:href='#icon-eglass-finish'></use>"
               + "  </svg>"
               + "  <svg class='icon icon__delete' aria-hidden='true' name='search' id-num="+cursor.value.id +">"
               + "   <use xlink:href='#icon-delete'></use>"
               + "  </svg>"
               + "</div>";

        // 如果时间戳不等于任务的时间戳，那就添加新的时间戳
        if(indexTime !== cursor.value.taskTime) {
          indexTime = cursor.value.taskTime;
          taskList.appendChild(timeStamp);
        }

        taskList.appendChild(perTask);
        cursor.continue();

      } else {
        // 符合条件的数据遍历完后
        // 页面展示任务
        section.innerHTML = "";
        section.appendChild(taskList);

        // 首任务聚焦
        if(taskList.firstChild) {
          taskList.firstChild.nextSibling.classList.add("todolist__focus");
        }
      }
    };
  },


  // 修改数据库中的数据
  modifyThings(id, type, newText){
    const transaction = db.transaction(["todoStore"], "readwrite");
    const store = transaction.objectStore("todoStore");
    const request  = store.get(id);

    request.onsuccess = function(){
      const data = request.result;
      data[type] = newText;
      store.put(data);
    };
  }


  // 搜索数据库中的数据
  searchThings(){
    const curThing = input.value;
    const transaction = db.transaction(["todoStore"], "readonly");
    const store = transaction.objectStore("todoStore");
    const indexTime = "";
    const taskList = document.createElement("ul");
    const key = 0;
    taskList.classList.add("todolist__list");

    store.openCursor(null, "prev").onsuccess = function(e){
      const cursor = e.target.result;
      if(cursor){
        if(cursor.value.title.indexOf(curThing) !== -1) {
          const taskTime = cursor.value.taskTime;
          const taskWeek = cursor.value.taskWeek;
          const perTask = document.createElement("li");
          const timeStamp = document.createElement("li");

          // 创建时间戳
          timeStamp.classList.add("todolist__time");
          timeStamp.innerHTML = "<span class='todolist__week'>"+ taskWeek +"</span>" +
                                "<span class='todolist__date'>" + taskTime + "</span>"

          // 单项任务的属性设计
          perTask.setAttribute("id", "things_"+ cursor.value.id);
          perTask.setAttribute("class", "todolist__content "+ cursor.value.level);
          perTask.setAttribute("id-num", cursor.value.id);
          perTask.innerHTML = "<div><span class='todolist__title' contenteditable='true' id-num="+cursor.value.id +">"+ cursor.value.title +"</span></div>"
                 + "<div class='icon__todo'>"
                 + "  <svg class='icon icon__nofinish' aria-hidden='true' name='search' id-num="+cursor.value.id +">"
                 + "    <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>"
                 + "    <use xlink:href='#icon-eglass-finish'></use>"
                 + "  </svg>"
                 + "  <svg class='icon icon__delete' aria-hidden='true' name='search' id-num="+cursor.value.id +">"
                 + "   <use xlink:href='#icon-delete'></use>"
                 + "  </svg>"
                 + "</div>";

          // 如果时间戳不等于任务的时间戳，那就添加新的时间戳
          if(indexTime !== cursor.value.taskTime) {
            indexTime = cursor.value.taskTime;
            taskList.appendChild(timeStamp);
          }

          taskList.appendChild(perTask);
          (key < cursor.key) ? key = cursor.key : key;
        }
        cursor.continue();
      } else {
        // 符合条件的数据遍历完后
        // 页面展示任务
        section.innerHTML = "";
        section.appendChild(taskList);

        // 首任务聚焦
        if(taskList.firstChild) {
          taskList.firstChild.nextSibling.classList.add("todolist__focus");
          showDetail(key);
        }
      }
    };
  },


  // 返回焦点任务的索引
  // 数据库游标查询需要时间，是异步程序所以需要构建 promise
  returnFocusId(indexType, type) {
    const promise = new Promise(function(resolve, reject) {
      const transaction = db.transaction(["todoStore"], "readonly");
      const store = transaction.objectStore("todoStore");
      const taskType = store.index(indexType);
      const boundKeyRange = IDBKeyRange.only(type);

      taskType.openCursor(boundKeyRange, "prev").onsuccess = function(e){
        const cursor = e.target.result;
        if(cursor){
          resolve(cursor.primaryKey);
        } else {
          reject("没有聚焦中的任务！");
        }
      };
    });

    return promise;
  },


  // 更新右侧任务详情
  updateDetail(id, type, detailContent){
    const transaction = db.transaction(["todoStore"], "readwrite");
    const store = transaction.objectStore("todoStore");
    const request  = store.get(id);
    request.onsuccess = function(){
      const data = request.result;
      data[type] = detailContent;
      store.put(data);
      console.log("更新任务详情成功！");
    };
  },


  // 显示右侧任务详情
  showDetail(id){
    const transaction = db.transaction(["todoStore"], "readwrite");
    const store = transaction.objectStore("todoStore");
    if(typeof id === "number") {
      const request  = store.get(id);
      request.onsuccess = function(){
        const data = request.result;
        const text = data.title;
        detail.previousElementSibling.innerText = text;
        detail.value = data.detail;
        detail.placeholder = "添加任务详情...";
        console.log("显示任务详情成功！");
      };
    } else {
      detail.previousElementSibling.innerText = "";
      detail.value = "";
      detail.placeholder = "此分类目前没有任务哦~";
    }
  },


  // 删除全部数据
  deleteAllThings(){
    indexedDB.deleteDatabase("todoAPP");
    window.location.href = "index.html";
  },


  // 随机展示数据
  randomThingsNow(randomContent, ramdomLevel){
    const title = randomContent;
    const taskLevel = ramdomLevel;
    const taskTime = new Date().toLocaleDateString();
    const taskWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
    const taskType = document.querySelector(".sidebar__act").getAttribute("taskType");
    const transaction = db.transaction(["todoStore"], "readwrite");
    // 请求数据对象
    const store = transaction.objectStore("todoStore");

    // 定义 todoStore
    const todos = {
      title: title,
      detail: null,
      level: taskLevel,
      taskTime: taskTime,
      taskType: taskType,
      taskWeek: taskWeek
    };

    // 添加事件
    const request = store.add(todos);

    // 更新右侧任务详情，异步程序使用 promise
    returnFocusId("taskType", taskType)
      .then(function(data) {
        showDetail(data);
      }).catch(function(err) {
        showDetail(err);
      });

    // 添加成功与失败
    request.onsuccess = function(){
      console.log("事件添加到数据库成功!");
    };

    request.onerror = function(){
      console.log("事件添加到数据库失败!");
    };
  }
};

export {DB};