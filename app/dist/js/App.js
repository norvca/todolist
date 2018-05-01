/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/assets/js/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/assets/js/App.js":
/*!******************************!*\
  !*** ./app/assets/js/App.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载各模块\r\nvar db = __webpack_require__(/*! ./modules/DB */ \"./app/assets/js/modules/DB.js\");\r\nvar headerModule = __webpack_require__(/*! ./modules/HeaderModule */ \"./app/assets/js/modules/HeaderModule.js\");\r\nvar sidebarModule = __webpack_require__(/*! ./modules/SidebarModule */ \"./app/assets/js/modules/SidebarModule.js\");\r\nvar todolistModule = __webpack_require__(/*! ./modules/TodolistModule */ \"./app/assets/js/modules/TodolistModule.js\");\r\nvar detailModule = __webpack_require__(/*! ./modules/DetailModule */ \"./app/assets/js/modules/DetailModule.js\");\r\nvar modalModule = __webpack_require__(/*! ./modules/ModalModule */ \"./app/assets/js/modules/ModalModule.js\");\r\n\r\n// 变量声明\r\nvar randomFire = document.querySelector('.site-header__random-task__fire');\r\nvar searchbox = document.querySelector('.site-header__search-box__content');\r\nvar input = document.querySelector('.site-header__search-box__input');\r\nvar level = document.querySelector('.icon__level');\r\nvar addBtn = document.querySelector('.icon__add');\r\nvar themeBtn = document.querySelector('.site-header__theme-btn');\r\nvar sidebarContent = document.querySelector('.sidebar__content');\r\nvar deleteData = document.querySelector('.sidebar__delete');\r\nvar section = document.querySelector('.todolist');\r\nvar detail = document.querySelector('.detail__paragraph');\r\nvar modal = document.querySelector('.modal');\r\n\r\n\r\n// site-header 区域\r\n// 点击触发随机事件\r\nrandomFire.addEventListener('click', headerModule.randomTask);\r\n\r\n// 开启查找任务功能\r\nsearchbox.addEventListener('click', headerModule.openSearchTask);\r\n\r\n// 输入框输入数据查找\r\ninput.addEventListener('keyup', headerModule.searchTask);\r\n\r\n// 任务等级切换\r\nlevel.onclick = headerModule.changeLevel;\r\n\r\n// 添加任务\r\naddBtn.addEventListener('click', headerModule.addTask1);\r\n\r\n// 回车添加任务\r\ndocument.onkeyup = headerModule.addTask2;\r\n\r\n// 主题切换\r\nthemeBtn.addEventListener('click', headerModule.changeTheme);\r\n\r\n\r\n// sideBar 区域\r\n// 左侧任务栏类别、等级导航\r\nsidebarContent.addEventListener('click', sidebarModule.navigation);\r\n\r\n// 显示删库模态框\r\ndeleteData.addEventListener('click', sidebarModule.showModalBox);\r\n\r\n\r\n// todolist 区域\r\n// 修改任务标题\r\nsection.addEventListener('focusout', todolistModule.changeTaskTitle);\r\n\r\n// 任务已完成功能\r\nsection.addEventListener('click', todolistModule.finishTask);\r\n\r\n// 删除任务\r\nsection.addEventListener('click', todolistModule.deleteTask);\r\n\r\n// 点击任务显示详情\r\nsection.addEventListener('click', todolistModule.showTaskDetail);\r\n\r\n\r\n// 右侧任务详情区域\r\ndetail.addEventListener('focusout', detailModule.refreshDetail);\r\n\r\n\r\n// 模态框区域\r\n// 是否清空数据库\r\nmodal.addEventListener('click', modalModule.isDeleteDB);\r\n\n\n//# sourceURL=webpack:///./app/assets/js/App.js?");

/***/ }),

/***/ "./app/assets/js/modules/DB.js":
/*!*************************************!*\
  !*** ./app/assets/js/modules/DB.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 变量声明\r\nvar toDayString = new Date().toString();\r\nvar thisWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();\r\nvar section = document.querySelector('.todolist');\r\nvar input = document.querySelector('.site-header__search-box__input');\r\nvar level = document.querySelector('.icon__level');\r\nvar detail = document.querySelector('.detail__paragraph');\r\n\r\n\r\n// 数据库模块\r\nvar DB = (function() {\r\n\r\n  // 初始化数据库\r\n  var initDB = function(){\r\n    // 打开数据库\r\n    var request = window.indexedDB.open('todoAPP', 1);\r\n    // 成功\r\n    request.onsuccess = function(){\r\n      console.log('开启数据库成功！');\r\n      db = this.result;\r\n      showTypeThings('taskType', 'work');\r\n    };\r\n\r\n    // 失败\r\n    request.onoerror = function(){\r\n      console.log('ERROR: 开启数据库失败！');\r\n    };\r\n\r\n    // 建立事件库与索引\r\n    request.onupgradeneeded = function(){\r\n      db = this.result;\r\n\r\n      // 建立事件仓库\r\n      if(!db.objectStoreNames.contains('todoDB')) {\r\n        // 创建对象\r\n        var store = db.createObjectStore('todoStore', {keyPath: 'id', autoIncrement: true});\r\n        // 创建索引\r\n        store.createIndex('id', 'id', {unique: true});\r\n        store.createIndex('title', 'title', {unique: false});\r\n        store.createIndex('taskType', 'taskType', {unique: false});\r\n        store.createIndex('level', 'level', {unique: false});\r\n      }\r\n    };\r\n  }\r\n\r\n\r\n  // 添加数据到数据库\r\n  var addThings = function(){\r\n    var title = input.value;\r\n    var taskLevel = level.getAttribute('level');\r\n    var taskTime = new Date().toLocaleDateString();\r\n    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n\r\n    var transaction = db.transaction(['todoStore'], 'readwrite');\r\n    // 请求数据对象\r\n    var store = transaction.objectStore('todoStore');\r\n\r\n    // 定义 todoStore\r\n    var todos = {\r\n      title: title,\r\n      detail: null,\r\n      level: taskLevel,\r\n      taskTime: taskTime,\r\n      taskType: taskType\r\n    };\r\n\r\n    // 添加事件\r\n    var request = store.add(todos);\r\n\r\n    // 添加成功与失败\r\n    request.onsuccess = function(){\r\n      console.log('事件添加到数据库成功!');\r\n    };\r\n\r\n    request.error = function(){\r\n      console.log('事件添加到数据库失败!');\r\n    };\r\n  }\r\n\r\n\r\n  // 展示不同类型的数据\r\n  var showTypeThings = function(indexType, type){\r\n    var transaction = db.transaction(['todoStore'], 'readonly');\r\n    var store = transaction.objectStore('todoStore');\r\n    var taskType = store.index(indexType);\r\n    var boundKeyRange = IDBKeyRange.only(type);\r\n    var toDay = new Date().toLocaleDateString();\r\n    var eachDay = document.querySelector('.todolist__eachday');\r\n    var todolist;\r\n\r\n    var output = '';\r\n    // 查询今天是否为最新日期\r\n    // Caution! 只能一打开页面就立马显示最新日期，暂时不能根据点击情况添加最新日期\r\n    if ( (!eachDay) || (eachDay.getAttribute('tasktime') !== toDay) ) {\r\n      var newDay = document.createElement('div');\r\n      var ul = document.createElement('ul');\r\n      ul.classList.add('todolist__list');\r\n      newDay.classList.add('todolist__eachday');\r\n      newDay.setAttribute('tasktime', toDay);\r\n\r\n      newDay.innerHTML = '<div class=\"todolist__time\">' +\r\n                         '<span class=\"todolist__week\">'+ thisWeek +'</span>' +\r\n                         '<span class=\"todolist__date\">' + toDay + '</span>' +\r\n                         '</div>';\r\n      newDay.appendChild(ul);\r\n\r\n      // 如果有以前的日期了则插入最新日期到顶部\r\n      if(eachDay) {\r\n        section.insertBefore(newDay, section.firstChild);\r\n      } else {\r\n        section.appendChild(newDay);\r\n      }\r\n    }\r\n\r\n    taskType.openCursor(boundKeyRange, 'prev').onsuccess = function(e){\r\n      var cursor = e.target.result;\r\n      if(cursor){\r\n        output += '<li id=\"things_'+ cursor.value.id +'\" class=\"todolist__content '+ cursor.value.level +'\" id-num='+cursor.value.id +'>';\r\n        output +='<div><span class=\"todolist__title\" contenteditable=\"true\" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';\r\n        // console.log(output)\r\n        output += '<div class=\"icon__todo\">';\r\n        output += '  <svg class=\"icon icon__nofinish\" aria-hidden=\"true\" name=\"search\" id-num='+cursor.value.id +'>';\r\n        output += '    <use class=\"icon__finish\" xlink:href=\"#icon-eglass-finish1\"></use>';\r\n        output += '    <use xlink:href=\"#icon-eglass-finish\"></use>';\r\n        output += '  </svg>';\r\n        output += '  <svg class=\"icon icon__delete\" aria-hidden=\"true\" name=\"search\" id-num='+cursor.value.id +'>';\r\n        output += '   <use xlink:href=\"#icon-delete\"></use>';\r\n        output += '  </svg>';\r\n        output += '</div>';\r\n        output += '</li>';\r\n        cursor.continue();\r\n      }\r\n\r\n      todolist = document.querySelector('.todolist__list');\r\n      todolist.innerHTML = output;\r\n      if(todolist.firstChild) {\r\n        todolist.firstChild.classList.add('todolist__focus');\r\n      }\r\n    };\r\n  }\r\n\r\n\r\n  // 修改数据库中的数据\r\n  var modifyThings =  function(id, type, newText){\r\n    var transaction = db.transaction(['todoStore'], 'readwrite');\r\n    var store = transaction.objectStore('todoStore');\r\n    var request  = store.get(id);\r\n\r\n    request.onsuccess = function(){\r\n      var data = request.result;\r\n      data[type] = newText;\r\n\r\n      store.put(data);\r\n    };\r\n  }\r\n\r\n\r\n  // 搜索数据库中的数据\r\n  var searchThings = function(){\r\n    var curThing = input.value;\r\n    var transaction = db.transaction(['todoStore'], 'readonly');\r\n    var store = transaction.objectStore('todoStore');\r\n    var taskTitle = store.index('title');\r\n\r\n    var reg = /[A-Za-z0-9]/;\r\n    var boundKeyRange;\r\n    if(reg.test(curThing)) {\r\n      // 匹配数字和字母\r\n      boundKeyRange = IDBKeyRange.bound(curThing, curThing+'z');\r\n    }else {\r\n      // 匹配中文汉字\r\n      boundKeyRange = IDBKeyRange.only(curThing);\r\n    }\r\n    var output = '';\r\n    taskTitle.openCursor(boundKeyRange).onsuccess = function(e){\r\n      var cursor = e.target.result;\r\n      if(cursor){\r\n        output += '<li id=\"things_'+ cursor.value.id +'\" class=\"todolist__content '+ cursor.value.level +'\" id-num='+cursor.value.id +'>';\r\n        output +='<div><span class=\"todolist__title\" contenteditable=\"true\" id-num='+cursor.value.id +'>'+ cursor.value.title +'</span></div>';\r\n        // console.log(output)\r\n        output += '<div class=\"icon__todo\">';\r\n        output += '  <svg class=\"icon icon__nofinish\" aria-hidden=\"true\" name=\"search\" id-num='+cursor.value.id +'>';\r\n        output += '    <use class=\"icon__finish\" xlink:href=\"#icon-eglass-finish1\"></use>';\r\n        output += '    <use xlink:href=\"#icon-eglass-finish\"></use>';\r\n        output += '  </svg>';\r\n        output += '  <svg class=\"icon icon__delete\" aria-hidden=\"true\" name=\"search\" id-num='+cursor.value.id +'>';\r\n        output += '   <use xlink:href=\"#icon-delete\"></use>';\r\n        output += '  </svg>';\r\n        output += '</div>';\r\n        output += '</li>';\r\n        cursor.continue();\r\n      }\r\n      document.querySelector('.todolist__list').innerHTML = output;\r\n    };\r\n  }\r\n\r\n\r\n  // 更新右侧任务详情\r\n  var updateDetail = function(id, type, detailContent){\r\n    var transaction = db.transaction(['todoStore'], 'readwrite');\r\n    var store = transaction.objectStore('todoStore');\r\n    var request  = store.get(id);\r\n    request.onsuccess = function(){\r\n      var data = request.result;\r\n      data[type] = detailContent;\r\n      store.put(data);\r\n      console.log('更新任务详情成功！');\r\n    };\r\n  }\r\n\r\n\r\n  // 显示右侧任务详情\r\n  var showDetail = function(id){\r\n    var transaction = db.transaction(['todoStore'], 'readwrite');\r\n    var store = transaction.objectStore('todoStore');\r\n    var request  = store.get(id);\r\n    request.onsuccess = function(){\r\n      var data = request.result;\r\n      var text = data.title;\r\n      detail.previousElementSibling.innerText = text;\r\n      detail.value = data.detail;\r\n      console.log('显示任务详情成功！');\r\n    };\r\n  }\r\n\r\n\r\n  // 删除全部数据\r\n  var deleteAllThings = function(){\r\n    indexedDB.deleteDatabase('todoAPP');\r\n    window.location.href = 'index.html';\r\n  }\r\n\r\n\r\n  // 随机展示数据\r\n  var randomThingsNow = function(randomContent, ramdomLevel){\r\n    var title = randomContent;\r\n    var taskLevel = ramdomLevel;\r\n    var taskTime = new Date().toLocaleDateString();\r\n    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n    var transaction = db.transaction(['todoStore'], 'readwrite');\r\n    // 请求数据对象\r\n    var store = transaction.objectStore('todoStore');\r\n\r\n    // 定义 todoStore\r\n    var todos = {\r\n      title: title,\r\n      detail: null,\r\n      level: taskLevel,\r\n      taskTime: taskTime,\r\n      taskType: taskType\r\n    };\r\n\r\n    // 添加事件\r\n    var request = store.add(todos);\r\n\r\n    // 添加成功与失败\r\n    request.onsuccess = function(){\r\n      console.log('事件添加到数据库成功!');\r\n    };\r\n\r\n    request.error = function(){\r\n      console.log('事件添加到数据库失败!');\r\n    };\r\n  }\r\n\r\n\r\n  // 创建数据库\r\n  initDB();\r\n\r\n\r\n  // 开放接口\r\n  return {\r\n    addThings,\r\n    showTypeThings,\r\n    modifyThings,\r\n    searchThings,\r\n    updateDetail,\r\n    showDetail,\r\n    deleteAllThings,\r\n    randomThingsNow\r\n  };\r\n\r\n})();\r\n\r\nmodule.exports = DB;\n\n//# sourceURL=webpack:///./app/assets/js/modules/DB.js?");

/***/ }),

/***/ "./app/assets/js/modules/DetailModule.js":
/*!***********************************************!*\
  !*** ./app/assets/js/modules/DetailModule.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载数据库模块\r\nvar db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\r\n\r\n\r\n// 定义右侧详情模块\r\nvar detailModule = (function(){\r\n  // 更新任务详情功能\r\n  var refreshDetail = function(){\r\n    var focusTask = document.querySelector('.todolist__focus');\r\n    var detailID = parseInt( focusTask.getAttribute('id-num') );\r\n    var detailContent = this.value;\r\n    var type = 'detail';\r\n    db.updateDetail(detailID, type, detailContent);\r\n  }\r\n\r\n  return {\r\n    refreshDetail\r\n  }\r\n})();\r\n\r\nmodule.exports = detailModule;\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./app/assets/js/modules/DetailModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/HeaderModule.js":
/*!***********************************************!*\
  !*** ./app/assets/js/modules/HeaderModule.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载数据库模块\r\nvar db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\r\n\r\n// 变量声明\r\nvar randomContentNow = ['读完那本英文原著', '中午去睡个好觉', '日语入门学习', '尝试做些家常菜', '了解一些设计常识'];\r\nvar randomLevel = ['bgc-light', 'bgc-usual', 'bgc-heavy'];\r\nvar input = document.querySelector('.site-header__search-box__input');\r\nvar searchbox = document.querySelector('.site-header__search-box__content');\r\nvar level = document.querySelector('.icon__level');\r\nvar theme = ['', 'theme-green', 'theme-purple', 'theme-gradual'];\r\nvar themeIconName = ['#icon-theme', '#icon-theme1', '#icon-theme2', '#icon-theme3'];\r\nvar siteHeader = document.querySelector('.site-header');\r\n\r\n\r\n// 定义页面头部处理程序模块\r\nvar headerModule = (function() {\r\n\r\n  // 触发随机任务功能\r\n  var randomTask = function(){\r\n    var ContentIndex = parseInt(Math.random()*randomContentNow.length);\r\n    var LevelIndex = parseInt(Math.random()*3);\r\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n    db.randomThingsNow(randomContentNow[ContentIndex], randomLevel[LevelIndex]);\r\n    db.showTypeThings('taskType', typeValue);\r\n  }\r\n\r\n  // 开启查找任务功能\r\n  var openSearchTask =  function(e) {\r\n    // 获取左侧栏目对应事件类型\r\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n\r\n    if(e.target.classList.contains('icon__search')) {\r\n      e.target.classList.toggle('act-color');\r\n      input.classList.toggle('act-color');\r\n      searchbox.classList.toggle('act-color');\r\n      input.focus();\r\n      input.value = '';\r\n      db.showTypeThings('taskType', typeValue);\r\n    }\r\n  }\r\n\r\n\r\n  // 查找任务功能\r\n  var searchTask = function(e){\r\n    if( e.target.classList.contains('act-color') ){\r\n      db.searchThings(this.value);\r\n    }\r\n  }\r\n\r\n\r\n  // 任务等级切换功能\r\n  var changeLevel = function(){\r\n    taskToggle();\r\n    input.focus();\r\n  }\r\n\r\n\r\n  // 等级切换函数\r\n  function taskToggle(){\r\n    if( level.classList.contains('level-light') ) {\r\n      level.classList.remove('level-light');\r\n      level.classList.add('level-usual');\r\n      level.setAttribute('level', 'bgc-usual');\r\n    } else if ( level.classList.contains('level-usual') ) {\r\n      level.classList.remove('level-usual');\r\n      level.classList.add('level-heavy');\r\n      level.setAttribute('level', 'bgc-heavy');\r\n    } else {\r\n      level.classList.remove('level-heavy');\r\n      level.classList.add('level-light');\r\n      level.setAttribute('level', 'bgc-light');\r\n    }\r\n  }\r\n\r\n\r\n  // 添加任务功能\r\n  var addTask1 = function(){\r\n    // 获取左侧栏目对应事件类型\r\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n    if( !input.value ){\r\n      return;\r\n    } else {\r\n      db.addThings();\r\n      db.showTypeThings('taskType', typeValue);\r\n      input.value = '';\r\n    }\r\n  }\r\n\r\n\r\n  // 按回车键添加任务功能\r\n  var addTask2 = function(e) {\r\n    // 兼容FF和IE和Opera\r\n    var event = e || window.event;\r\n    var key = event.which || event.keyCode || event.charCode;\r\n    // 获取左侧栏目对应事件类型\r\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\r\n\r\n    // 焦点在搜索栏并按回车\r\n    if(document.activeElement.value) {\r\n      if (key == 13 && document.activeElement.tagName.toUpperCase() === 'INPUT') {\r\n        db.addThings();\r\n        db.showTypeThings('taskType', typeValue);\r\n        input.value = '';\r\n      }\r\n    }\r\n  }\r\n\r\n\r\n  // 切换主题功能\r\n  var changeTheme = function(){\r\n    var themeIcon = this.children[0].children[0];\r\n    // 切换主题数组\r\n    theme.push(theme.shift());\r\n    themeIconName.push(themeIconName.shift());\r\n    // 应用主题\r\n    siteHeader.setAttribute('class', (\"site-header \"+ theme[0]));\r\n    themeIcon.setAttribute('xlink:href', themeIconName[0]);\r\n  }\r\n\r\n  return {\r\n    randomTask,\r\n    openSearchTask,\r\n    searchTask,\r\n    changeLevel,\r\n    addTask1,\r\n    addTask2,\r\n    changeTheme\r\n  }\r\n\r\n})();\r\n\r\nmodule.exports = headerModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/HeaderModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/ModalModule.js":
/*!**********************************************!*\
  !*** ./app/assets/js/modules/ModalModule.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载数据库模块\r\nvar db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\r\n\r\nvar modalModule = (function() {\r\n\r\n  // 是否清空数据库功能\r\n  var isDeleteDB = function(e){\r\n    if( e.target.classList.contains('modal__btn-yes') ) {\r\n      this.classList.remove('modal--visible');\r\n      db.deleteAllThings();\r\n    } else if ( e.target.classList.contains('modal__btn-no') ) {\r\n      this.classList.remove('modal--visible');\r\n    }\r\n  }\r\n\r\n  return {\r\n    isDeleteDB\r\n  };\r\n})();\r\n\r\nmodule.exports = modalModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/ModalModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/SidebarModule.js":
/*!************************************************!*\
  !*** ./app/assets/js/modules/SidebarModule.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载数据库模块\r\nvar db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\r\n\r\n// 变量声明\r\nvar levelBox = [0,1,2];\r\nvar modal = document.querySelector('.modal');\r\n\r\n\r\n// 定义页面左侧导航处理程序模块\r\nvar sidebarModule = (function() {\r\n\r\n  // 左侧导航栏功能\r\n  var navigation = function(e){\r\n    var lis = document.querySelectorAll('.sidebar__list-type');\r\n    var target = e.target;\r\n    var firstTask;\r\n    var firstTaskID;\r\n\r\n    // 点击到了任务类别的话\r\n    if( target.classList.contains('sidebar__list-type')) {\r\n      lis.forEach(function(ele){\r\n        ele.classList.remove('sidebar__act');\r\n      });\r\n      target.classList.add('sidebar__act');\r\n\r\n      // 展示不同类型任务到页面\r\n      var typeValue = target.getAttribute('taskType');\r\n      db.showTypeThings('taskType', typeValue);\r\n\r\n      // 更新右侧任务详情--错误代码\r\n      // CAUTION！ 获取到的 firstTaskID 总是页面更新前的 firstTaskID，导致详情更新慢一步。\r\n      firstTask = document.querySelector('.todolist__focus');\r\n      if(firstTask){\r\n        firstTaskID = parseInt( firstTask.getAttribute('id-num') );\r\n        db.showDetail(firstTaskID);\r\n      }\r\n    }\r\n    // 点击到了任务等级的话\r\n    else if (target.classList.contains('sidebar__list-level')) {\r\n      levelBox.push(levelBox.shift());\r\n      var levels = target.children;\r\n      var thisLevel = levels[levelBox[0]];\r\n      var levelValue = thisLevel.getAttribute('level');\r\n\r\n      // 去除 active 类名\r\n      Array.prototype.forEach.call(levels, function(e){\r\n        e.classList.remove('active');\r\n      });\r\n      // 给当前任务等级添加 active\r\n      thisLevel.classList.add('active');\r\n      db.showTypeThings('level', levelValue);\r\n\r\n      // 更新右侧任务详情--错误代码\r\n      // CAUTION！ 获取到的 firstTaskID 总是页面更新前的 firstTaskID，导致详情更新慢一步。\r\n      firstTask = document.querySelector('.todolist__focus');\r\n      if(firstTask){\r\n        firstTaskID = parseInt( firstTask.getAttribute('id-num') );\r\n        db.showDetail(firstTaskID);\r\n      }\r\n    }\r\n  }\r\n\r\n\r\n  // 显示删库模态框功能\r\n  var showModalBox = function(){\r\n    modal.classList.add('modal--visible');\r\n  }\r\n\r\n  return {\r\n    navigation,\r\n    showModalBox\r\n  }\r\n\r\n})();\r\n\r\nmodule.exports = sidebarModule;\r\n\r\n\n\n//# sourceURL=webpack:///./app/assets/js/modules/SidebarModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/TodolistModule.js":
/*!*************************************************!*\
  !*** ./app/assets/js/modules/TodolistModule.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 加载数据库模块\r\nvar db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\r\n\r\n\r\n// 定义主任务界面模块\r\nvar todolistModule = (function() {\r\n\r\n  // 修改任务标题功能\r\n  var changeTaskTitle = function(e){\r\n    if(e.target.tagName.toUpperCase() === 'SPAN'){\r\n      var idNum = parseInt( e.target.getAttribute('id-num') );\r\n      var newText = e.target.innerText;\r\n\r\n      db.modifyThings(idNum, 'title', newText);\r\n    }\r\n  }\r\n\r\n\r\n  // 任务已完成功能\r\n  var finishTask = function(e){\r\n    if( e.target.classList.contains('icon__nofinish')){\r\n      var idNum = parseInt( e.target.getAttribute('id-num') );\r\n      db.modifyThings(idNum, 'taskType', 'finish');\r\n\r\n      // 删除页面上的数据\r\n      var ele = document.querySelector('#things_'+ idNum);\r\n      ele.parentNode.removeChild(ele);\r\n    }\r\n  }\r\n\r\n\r\n  // 任务删除功能\r\n  var deleteTask = function(e){\r\n    if(e.target.classList.contains('icon__delete')){\r\n      var idNum = parseInt( e.target.getAttribute('id-num') );\r\n      db.modifyThings(idNum, 'taskType', 'bin');\r\n\r\n      // 删除页面上的数据\r\n      var ele = document.querySelector('#things_'+ idNum);\r\n      ele.parentNode.removeChild(ele);\r\n    }\r\n  }\r\n\r\n\r\n  // 显示任务详情功能\r\n  var showTaskDetail = function(e){\r\n    if(e.target.tagName.toUpperCase() === 'LI'){\r\n      var childNodes = e.target.parentNode.childNodes;\r\n      var taskID = parseInt( e.target.getAttribute('id-num') );\r\n      childNodes.forEach(function(e){\r\n        e.classList.remove('todolist__focus');\r\n      });\r\n\r\n      e.target.classList.add('todolist__focus');\r\n      db.showDetail(taskID);\r\n    }\r\n  }\r\n\r\n  return {\r\n    changeTaskTitle,\r\n    finishTask,\r\n    deleteTask,\r\n    showTaskDetail\r\n  }\r\n\r\n})();\r\n\r\nmodule.exports = todolistModule;\r\n\r\n\n\n//# sourceURL=webpack:///./app/assets/js/modules/TodolistModule.js?");

/***/ })

/******/ });