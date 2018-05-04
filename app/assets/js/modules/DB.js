// 数据库模块
var DB = (function() {
  // 变量声明
  var toDayString = new Date().toString();
  var thisWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();
  var section = document.querySelector('.todolist');
  var input = document.querySelector('.site-header__search-box__input');
  var level = document.querySelector('.icon__level');
  var detail = document.querySelector('.detail__paragraph');


  // 初始化数据库
  var initDB = function(){
    // 打开数据库
    var request = window.indexedDB.open('todoAPP', 1);
    // 成功
    request.onsuccess = function(){
      console.log('开启数据库成功！');
      db = this.result;
      showTypeThings('taskType', 'work');
    };

    // 失败
    request.onoerror = function(){
      console.log('ERROR: 开启数据库失败！');
    };

    // 建立事件库与索引
    request.onupgradeneeded = function(){
      db = this.result;

      // 建立事件仓库
      if(!db.objectStoreNames.contains('todoDB')) {
        // 创建对象
        var store = db.createObjectStore('todoStore', {keyPath: 'id', autoIncrement: true});
        // 创建索引
        store.createIndex('id', 'id', {unique: true});
        store.createIndex('title', 'title', {unique: false});
        store.createIndex('taskType', 'taskType', {unique: false});
        store.createIndex('level', 'level', {unique: false});
      }
    };
  }


  // 添加数据到数据库
  var addThings = function(){
    var title = input.value;
    var taskLevel = level.getAttribute('level');
    var taskTime = new Date().toLocaleDateString();
    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');

    var transaction = db.transaction(['todoStore'], 'readwrite');
    // 请求数据对象
    var store = transaction.objectStore('todoStore');

    // 定义 todoStore
    var todos = {
      title: title,
      detail: null,
      level: taskLevel,
      taskTime: taskTime,
      taskType: taskType
    };

    // 添加事件
    var request = store.add(todos);

    // 添加成功与失败
    request.onsuccess = function(){
      console.log('事件添加到数据库成功!');
    };

    request.error = function(){
      console.log('事件添加到数据库失败!');
    };
  }


  // 展示不同类型的数据
  var showTypeThings = function(indexType, type){
    var transaction = db.transaction(['todoStore'], 'readonly');
    var store = transaction.objectStore('todoStore');
    var taskType = store.index(indexType);
    var boundKeyRange = IDBKeyRange.only(type);
    var toDay = new Date().toLocaleDateString();
    var eachDay = document.querySelector('.todolist__eachday');
    var todolist;

    var output = '';
    // 查询今天是否为最新日期
    // Caution! 只能一打开页面就立马显示最新日期，暂时不能根据点击情况添加最新日期
    if ( (!eachDay) || (eachDay.getAttribute('tasktime') !== toDay) ) {
      var newDay = document.createElement('div');
      var ul = document.createElement('ul');
      ul.classList.add('todolist__list');
      newDay.classList.add('todolist__eachday');
      newDay.setAttribute('tasktime', toDay);

      newDay.innerHTML = '<div class="todolist__time">' +
                         '<span class="todolist__week">'+ thisWeek +'</span>' +
                         '<span class="todolist__date">' + toDay + '</span>' +
                         '</div>';
      newDay.appendChild(ul);

      // 如果有以前的日期了则插入最新日期到顶部
      if(eachDay) {
        section.insertBefore(newDay, section.firstChild);
      } else {
        section.appendChild(newDay);
      }
    }

    taskType.openCursor(boundKeyRange, 'prev').onsuccess = function(e){
      var cursor = e.target.result;
      if(cursor){
        output += '<li id="things_'+ cursor.value.id +'" class="todolist__content '+ cursor.value.level +'" id-num='+cursor.value.id +'>';
        output +='<div><span class="todolist__title" contenteditable="true" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';
        // console.log(output)
        output += '<div class="icon__todo">';
        output += '  <svg class="icon icon__nofinish" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '    <use class="icon__finish" xlink:href="#icon-eglass-finish1"></use>';
        output += '    <use xlink:href="#icon-eglass-finish"></use>';
        output += '  </svg>';
        output += '  <svg class="icon icon__delete" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '   <use xlink:href="#icon-delete"></use>';
        output += '  </svg>';
        output += '</div>';
        output += '</li>';
        cursor.continue();
      }

      todolist = document.querySelector('.todolist__list');
      todolist.innerHTML = output;
      if(todolist.firstChild) {
        todolist.firstChild.classList.add('todolist__focus');
      }
    };
  }


  // 修改数据库中的数据
  var modifyThings =  function(id, type, newText){
    var transaction = db.transaction(['todoStore'], 'readwrite');
    var store = transaction.objectStore('todoStore');
    var request  = store.get(id);

    request.onsuccess = function(){
      var data = request.result;
      data[type] = newText;

      store.put(data);
    };
  }


  // 搜索数据库中的数据
  var searchThings = function(){
    var curThing = input.value;
    var transaction = db.transaction(['todoStore'], 'readonly');
    var store = transaction.objectStore('todoStore');
    var taskTitle = store.index('title');

    var reg = /[A-Za-z0-9]/;
    var boundKeyRange;
    if(reg.test(curThing)) {
      // 匹配数字和字母
      boundKeyRange = IDBKeyRange.bound(curThing, curThing+'z');
    }else {
      // 匹配中文汉字
      boundKeyRange = IDBKeyRange.only(curThing);
    }
    var output = '';
    taskTitle.openCursor(boundKeyRange).onsuccess = function(e){
      var cursor = e.target.result;
      if(cursor){
        output += '<li id="things_'+ cursor.value.id +'" class="todolist__content '+ cursor.value.level +'" id-num='+cursor.value.id +'>';
        output +='<div><span class="todolist__title" contenteditable="true" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';
        // console.log(output)
        output += '<div class="icon__todo">';
        output += '  <svg class="icon icon__nofinish" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '    <use class="icon__finish" xlink:href="#icon-eglass-finish1"></use>';
        output += '    <use xlink:href="#icon-eglass-finish"></use>';
        output += '  </svg>';
        output += '  <svg class="icon icon__delete" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '   <use xlink:href="#icon-delete"></use>';
        output += '  </svg>';
        output += '</div>';
        output += '</li>';
        cursor.continue();
      }
      document.querySelector('.todolist__list').innerHTML = output;
    };
  }


  // 更新右侧任务详情
  var updateDetail = function(id, type, detailContent){
    var transaction = db.transaction(['todoStore'], 'readwrite');
    var store = transaction.objectStore('todoStore');
    var request  = store.get(id);
    request.onsuccess = function(){
      var data = request.result;
      data[type] = detailContent;
      store.put(data);
      console.log('更新任务详情成功！');
    };
  }


  // 显示右侧任务详情
  var showDetail = function(id){
    var transaction = db.transaction(['todoStore'], 'readwrite');
    var store = transaction.objectStore('todoStore');
    var request  = store.get(id);
    request.onsuccess = function(){
      var data = request.result;
      var text = data.title;
      detail.previousElementSibling.innerText = text;
      detail.value = data.detail;
      console.log('显示任务详情成功！');
    };
  }


  // 删除全部数据
  var deleteAllThings = function(){
    indexedDB.deleteDatabase('todoAPP');
    window.location.href = 'index.html';
  }


  // 随机展示数据
  var randomThingsNow = function(randomContent, ramdomLevel){
    var title = randomContent;
    var taskLevel = ramdomLevel;
    var taskTime = new Date().toLocaleDateString();
    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');
    var transaction = db.transaction(['todoStore'], 'readwrite');
    // 请求数据对象
    var store = transaction.objectStore('todoStore');

    // 定义 todoStore
    var todos = {
      title: title,
      detail: null,
      level: taskLevel,
      taskTime: taskTime,
      taskType: taskType
    };

    // 添加事件
    var request = store.add(todos);

    // 添加成功与失败
    request.onsuccess = function(){
      console.log('事件添加到数据库成功!');
    };

    request.error = function(){
      console.log('事件添加到数据库失败!');
    };
  }


  // 开放接口
  return {
    initDB,
    addThings,
    showTypeThings,
    modifyThings,
    searchThings,
    updateDetail,
    showDetail,
    deleteAllThings,
    randomThingsNow
  };

})();

module.exports = DB;