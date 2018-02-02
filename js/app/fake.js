  var todoAPP = (function(){
  var db,
    addBtn = document.querySelector('.icon-add'),
    level = document.querySelector('.icon-level'),
    toDayString = new Date().toString(),
    thisWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase(),
    section = document.querySelector('section'),
    input = document.querySelector('#serach-input'),
    searchbox = document.querySelector('.search-add-box'),
    // 菜单栏类别切换
    levelBox = [0,1,2];

  function initDB(){
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

  // 搜索栏选择切换任务等级
  function taskToggle(){
    if( level.classList.contains('level-light') ) {
      level.classList.remove('level-light');
      level.classList.add('level-usual');
      level.setAttribute('level', 'bgc-usual');
    } else if ( level.classList.contains('level-usual') ) {
      level.classList.remove('level-usual');
      level.classList.add('level-heavy');
      level.setAttribute('level', 'bgc-heavy');
    } else {
      level.classList.remove('level-heavy');
      level.classList.add('level-light');
      level.setAttribute('level', 'bgc-light');
    }
  }

  // 添加数据到数据库
  function addThings(){
    var title = input.value;
    var taskLevel = level.getAttribute('level');
    var taskTime = new Date().toLocaleDateString();
    var taskType = document.querySelector('.act-type').getAttribute('taskType');

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
  function showTypeThings(indexType, type){
    var transaction = db.transaction(['todoStore'], 'readonly');
    var store = transaction.objectStore('todoStore');
    var taskType = store.index(indexType);
    var boundKeyRange = IDBKeyRange.only(type);
    var toDay = new Date().toLocaleDateString();
    var eachDay = document.querySelector('.todo-each-day');

    var output = '';
    // 查询今天是否为最新日期
    // Caution! 只能一打开页面就立马显示最新日期，暂时不能根据点击情况添加最新日期
    if ( (!eachDay) || !(eachDay.getAttribute('tasktime') == toDay) ) {
      var newDay = document.createElement('div');
      var ul = document.createElement('ul');
      ul.classList.add('todo-list');
      newDay.classList.add('todo-each-day');
      newDay.setAttribute('tasktime', toDay);

      newDay.innerHTML = '<div class="todo-time">' +
                         '<span class="todo-week">'+ thisWeek +'</span>' +
                         '<span class="todo-date">' + toDay + '</span>' +
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
        output += '<li id="things_'+ cursor.value.id +'" class="todo-box '+ cursor.value.level +'">';
        output +='<div class="todo-title"><span contenteditable="true" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';
        // console.log(output)
        output += '<div class="todo-icon">';
        output += '  <svg class="icon icon-nofinish" aria-hidden="true" name="search">';
        output += '    <use xlink:href="#icon-eglass-finish"></use>';
        output += '  </svg>';
        output += '  <svg class="icon icon-delete" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '   <use xlink:href="#icon-delete"></use>';
        output += '  </svg>';
        output += '</div>';
        output += '</li>';
        cursor.continue();
      }
      document.querySelector('.todo-list').innerHTML = output;
    };
  }

  // 删除数据
  function deleteThings(id){
    var transaction = db.transaction(['todoStore'], 'readwrite');
    // 请求数据对象
    var store = transaction.objectStore('todoStore');
    var request  = store.delete(id);
    request.onsuccess = function(){
      // 删除页面上的数据
      var ele = document.querySelector('#things_'+ id);
      ele.parentNode.removeChild(ele);
    };
  }

  // 修改数据库中的数据
  function modifyThings(id, newText){
    var transaction = db.transaction(['todoStore'], 'readwrite');
    var store = transaction.objectStore('todoStore');
    var request  = store.get(id);

    request.onsuccess = function(){
      var data = request.result;
      data.title = newText;

      store.put(data);
    };
  }

  // 搜索数据库中的数据
  function searchThings(){
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
        output += '<li id="things_'+ cursor.value.id +'" class="todo-box '+ cursor.value.level +'">';
        output +='<div class="todo-title"><span contenteditable="true" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';
        // console.log(output)
        output += '<div class="todo-icon">';
        output += '  <svg class="icon icon-nofinish" aria-hidden="true" name="search">';
        output += '    <use xlink:href="#icon-eglass-finish"></use>';
        output += '  </svg>';
        output += '  <svg class="icon icon-delete" aria-hidden="true" name="search" id-num='+cursor.value.id +'>';
        output += '   <use xlink:href="#icon-delete"></use>';
        output += '  </svg>';
        output += '</div>';
        output += '</li>';
        cursor.continue();
      }
      document.querySelector('.todo-list').innerHTML = output;
    };
  }


  initDB();

  // 事件处理程序
  // 添加任务
  addBtn.addEventListener('click', function(){
  // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector('.act-type').getAttribute('taskType');
    if( !input.value ){
      return;
    } else {
      addThings();
      showTypeThings('taskType', typeValue);
      input.value = '';
    }
  });

  // 回车添加任务
  document.onkeyup = function(e) {
    // 兼容FF和IE和Opera
    var event = e || window.event;
    var key = event.which || event.keyCode || event.charCode;
    // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector('.act-type').getAttribute('taskType');


    // 焦点在搜索栏并按回车
    if(document.activeElement.value) {
      if (key == 13 && document.activeElement.tagName.toUpperCase() === 'INPUT') {
        addThings();
        showTypeThings('taskType', typeValue);
        input.value = '';
      }
    }
  };

  // 删除任务
  section.onclick = function(e){
    if(e.target.classList.contains('icon-delete')){
      var idNum = parseInt( e.target.getAttribute('id-num') );
      deleteThings(idNum);
    }
  };

  // 任务等级切换
  level.onclick = function(){
    taskToggle();
    input.focus();
  };

  // 修改数据
  section.addEventListener('focusout', function(e){
    if(e.target.tagName.toUpperCase() === 'SPAN'){
      var idNum = parseInt( e.target.getAttribute('id-num') );
      var newText = e.target.innerText;

      modifyThings(idNum, newText);
    }
  });

  // 开启查找功能
  searchbox.addEventListener('click', function(e) {
    // 获取左侧栏目对应事件类型
    var typeValue = document.querySelector('.act-type').getAttribute('taskType');

    if(e.target.classList.contains('icon-search')) {
      e.target.classList.toggle('act-color');
      input.classList.toggle('act-color');
      searchbox.classList.toggle('act-color');
      input.focus();
      input.value = '';
      showTypeThings('taskType', typeValue);
    }
  });

  // 输入框输入数据查找
  input.addEventListener('keyup', function(e){
    if( e.target.classList.contains('act-color') ){
      searchThings(this.value);
    }
  });

  // 左侧任务栏类别、等级、删除功能
  document.querySelector('.nav').addEventListener('click', function(e){
    var lis = document.querySelectorAll('.nav-type');
    var target = e.target;

    // 点击到了任务类别的话
    if( target.classList.contains('nav-type')) {
      lis.forEach(function(ele){
        ele.classList.remove('act-type');
      });
      target.classList.add('act-type');

      // 展示不同类型任务到页面
      var typeValue = target.getAttribute('taskType');
      showTypeThings('taskType', typeValue);
    }
    // 点击到了任务等级的话
    else if (target.classList.contains('nav-level')) {
      levelBox.push(levelBox.shift());
      var levels = target.children;
      var thisLevel = levels[levelBox[0]];
      var levelValue = thisLevel.getAttribute('level');

      // 去除 active 类名
      Array.prototype.forEach.call(levels, function(e){
        e.classList.remove('active');
      });
      // 给当前任务等级添加 active
      thisLevel.classList.add('active');
      showTypeThings('level', levelValue);
    }



  });

})();