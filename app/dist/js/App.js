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

"use strict";
eval("\n\nvar db = __webpack_require__(/*! ./modules/DB */ \"./app/assets/js/modules/DB.js\");\n__webpack_require__(/*! ./modules/Handler */ \"./app/assets/js/modules/Handler.js\");\n\n// 打开数据库\ndb.initDB();\n\n//# sourceURL=webpack:///./app/assets/js/App.js?");

/***/ }),

/***/ "./app/assets/js/modules/DB.js":
/*!*************************************!*\
  !*** ./app/assets/js/modules/DB.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 数据库模块\nvar DB = function () {\n  // 变量声明\n  var toDayString = new Date().toString();\n  var thisWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase();\n  var section = document.querySelector('.todolist');\n  var input = document.querySelector('.site-header__search-box__input');\n  var level = document.querySelector('.icon__level');\n  var detail = document.querySelector('.detail__paragraph');\n  var db;\n\n  // 初始化数据库\n  var initDB = function initDB() {\n    // 打开数据库\n    var request = window.indexedDB.open('todoAPP', 1);\n\n    // 成功\n    request.onsuccess = function () {\n      console.log('开启数据库成功！');\n      db = this.result;\n      showTypeThings('taskType', 'work');\n    };\n\n    // 失败\n    request.onoerror = function () {\n      console.log('ERROR: 开启数据库失败！');\n    };\n\n    // 建立事件库与索引\n    request.onupgradeneeded = function () {\n      db = this.result;\n\n      // 建立事件仓库\n      if (!db.objectStoreNames.contains('todoDB')) {\n        // 创建对象\n        var store = db.createObjectStore('todoStore', { keyPath: 'id', autoIncrement: true });\n        // 创建索引\n        store.createIndex('id', 'id', { unique: true });\n        store.createIndex('title', 'title', { unique: false });\n        store.createIndex('taskType', 'taskType', { unique: false });\n        store.createIndex('level', 'level', { unique: false });\n      }\n    };\n  };\n\n  // 添加数据到数据库\n  var addThings = function addThings() {\n    var title = input.value;\n    var taskLevel = level.getAttribute('level');\n    var taskTime = new Date().toLocaleDateString();\n    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');\n\n    var transaction = db.transaction(['todoStore'], 'readwrite');\n    // 请求数据对象\n    var store = transaction.objectStore('todoStore');\n\n    // 定义 todoStore\n    var todos = {\n      title: title,\n      detail: null,\n      level: taskLevel,\n      taskTime: taskTime,\n      taskType: taskType\n    };\n\n    // 添加事件\n    var request = store.add(todos);\n\n    // 添加成功与失败\n    request.onsuccess = function () {\n      console.log('事件添加到数据库成功!');\n    };\n\n    request.onerror = function () {\n      console.log('事件添加到数据库失败!');\n    };\n  };\n\n  // 展示不同类型的数据\n  var showTypeThings = function showTypeThings(indexType, type) {\n    var transaction = db.transaction(['todoStore'], 'readonly');\n    var store = transaction.objectStore('todoStore');\n    var taskType = store.index(indexType);\n    var boundKeyRange = IDBKeyRange.only(type);\n    var toDay = new Date().toLocaleDateString();\n    var eachDay = document.querySelector('.todolist__eachday');\n    var todolist;\n\n    var output = '';\n    // 查询今天是否为最新日期\n    // Caution! 只能一打开页面就立马显示最新日期，暂时不能根据点击情况添加最新日期\n    if (!eachDay || eachDay.getAttribute('tasktime') !== toDay) {\n      var newDay = document.createElement('div');\n      var ul = document.createElement('ul');\n      ul.classList.add('todolist__list');\n      newDay.classList.add('todolist__eachday');\n      newDay.setAttribute('tasktime', toDay);\n\n      newDay.innerHTML = '<div class=\"todolist__time\">' + '<span class=\"todolist__week\">' + thisWeek + '</span>' + '<span class=\"todolist__date\">' + toDay + '</span>' + '</div>';\n      newDay.appendChild(ul);\n\n      // 如果有以前的日期了则插入最新日期到顶部\n      if (eachDay) {\n        section.insertBefore(newDay, section.firstChild);\n      } else {\n        section.appendChild(newDay);\n      }\n    }\n\n    taskType.openCursor(boundKeyRange, 'prev').onsuccess = function (e) {\n      var cursor = e.target.result;\n      if (cursor) {\n        output += '<li id=\"things_' + cursor.value.id + '\" class=\"todolist__content ' + cursor.value.level + '\" id-num=' + cursor.value.id + '>';\n        output += '<div><span class=\"todolist__title\" contenteditable=\"true\" id-num=' + cursor.value.id + '>' + cursor.value.title + '</span></div>';\n        // console.log(output)\n        output += '<div class=\"icon__todo\">';\n        output += '  <svg class=\"icon icon__nofinish\" aria-hidden=\"true\" name=\"search\" id-num=' + cursor.value.id + '>';\n        output += '    <use class=\"icon__finish\" xlink:href=\"#icon-eglass-finish1\"></use>';\n        output += '    <use xlink:href=\"#icon-eglass-finish\"></use>';\n        output += '  </svg>';\n        output += '  <svg class=\"icon icon__delete\" aria-hidden=\"true\" name=\"search\" id-num=' + cursor.value.id + '>';\n        output += '   <use xlink:href=\"#icon-delete\"></use>';\n        output += '  </svg>';\n        output += '</div>';\n        output += '</li>';\n        cursor.continue();\n      }\n\n      todolist = document.querySelector('.todolist__list');\n      todolist.innerHTML = output;\n      if (todolist.firstChild) {\n        todolist.firstChild.classList.add('todolist__focus');\n      }\n    };\n  };\n\n  // 修改数据库中的数据\n  var modifyThings = function modifyThings(id, type, newText) {\n    var transaction = db.transaction(['todoStore'], 'readwrite');\n    var store = transaction.objectStore('todoStore');\n    var request = store.get(id);\n\n    request.onsuccess = function () {\n      var data = request.result;\n      data[type] = newText;\n\n      store.put(data);\n    };\n  };\n\n  // 搜索数据库中的数据\n  var searchThings = function searchThings() {\n    var curThing = input.value;\n    var transaction = db.transaction(['todoStore'], 'readonly');\n    var store = transaction.objectStore('todoStore');\n    var output = '';\n    store.openCursor().onsuccess = function (e) {\n      var cursor = e.target.result;\n      if (cursor) {\n        if (cursor.value.title.indexOf(curThing) !== -1) {\n          output += '<li id=\"things_' + cursor.value.id + '\" class=\"todolist__content ' + cursor.value.level + '\" id-num=' + cursor.value.id + '>';\n          output += '<div><span class=\"todolist__title\" contenteditable=\"true\" id-num=' + cursor.value.id + '>' + cursor.value.title + '</span></div>';\n          output += '<div class=\"icon__todo\">';\n          output += '  <svg class=\"icon icon__nofinish\" aria-hidden=\"true\" name=\"search\" id-num=' + cursor.value.id + '>';\n          output += '    <use class=\"icon__finish\" xlink:href=\"#icon-eglass-finish1\"></use>';\n          output += '    <use xlink:href=\"#icon-eglass-finish\"></use>';\n          output += '  </svg>';\n          output += '  <svg class=\"icon icon__delete\" aria-hidden=\"true\" name=\"search\" id-num=' + cursor.value.id + '>';\n          output += '   <use xlink:href=\"#icon-delete\"></use>';\n          output += '  </svg>';\n          output += '</div>';\n          output += '</li>';\n        }\n        cursor.continue();\n      }\n      document.querySelector('.todolist__list').innerHTML = output;\n    };\n  };\n\n  // 更新右侧任务详情\n  var updateDetail = function updateDetail(id, type, detailContent) {\n    var transaction = db.transaction(['todoStore'], 'readwrite');\n    var store = transaction.objectStore('todoStore');\n    var request = store.get(id);\n    request.onsuccess = function () {\n      var data = request.result;\n      data[type] = detailContent;\n      store.put(data);\n      console.log('更新任务详情成功！');\n    };\n  };\n\n  // 显示右侧任务详情\n  var showDetail = function showDetail(id) {\n    var transaction = db.transaction(['todoStore'], 'readwrite');\n    var store = transaction.objectStore('todoStore');\n    var request = store.get(id);\n    request.onsuccess = function () {\n      var data = request.result;\n      var text = data.title;\n      detail.previousElementSibling.innerText = text;\n      detail.value = data.detail;\n      console.log('显示任务详情成功！');\n    };\n  };\n\n  // 删除全部数据\n  var deleteAllThings = function deleteAllThings() {\n    indexedDB.deleteDatabase('todoAPP');\n    window.location.href = 'index.html';\n  };\n\n  // 随机展示数据\n  var randomThingsNow = function randomThingsNow(randomContent, ramdomLevel) {\n    var title = randomContent;\n    var taskLevel = ramdomLevel;\n    var taskTime = new Date().toLocaleDateString();\n    var taskType = document.querySelector('.sidebar__act').getAttribute('taskType');\n    var transaction = db.transaction(['todoStore'], 'readwrite');\n    // 请求数据对象\n    var store = transaction.objectStore('todoStore');\n\n    // 定义 todoStore\n    var todos = {\n      title: title,\n      detail: null,\n      level: taskLevel,\n      taskTime: taskTime,\n      taskType: taskType\n    };\n\n    // 添加事件\n    var request = store.add(todos);\n\n    // 添加成功与失败\n    request.onsuccess = function () {\n      console.log('事件添加到数据库成功!');\n    };\n\n    request.onerror = function () {\n      console.log('事件添加到数据库失败!');\n    };\n  };\n\n  // 开放接口\n  return {\n    initDB: initDB,\n    addThings: addThings,\n    showTypeThings: showTypeThings,\n    modifyThings: modifyThings,\n    searchThings: searchThings,\n    updateDetail: updateDetail,\n    showDetail: showDetail,\n    deleteAllThings: deleteAllThings,\n    randomThingsNow: randomThingsNow\n  };\n}();\n\nmodule.exports = DB;\n\n//# sourceURL=webpack:///./app/assets/js/modules/DB.js?");

/***/ }),

/***/ "./app/assets/js/modules/DetailModule.js":
/*!***********************************************!*\
  !*** ./app/assets/js/modules/DetailModule.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 定义右侧详情模块\nvar detailModule = function () {\n  // 加载数据库模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n\n  // 更新任务详情功能\n  var refreshDetail = function refreshDetail() {\n    var focusTask = document.querySelector('.todolist__focus');\n    var detailID = parseInt(focusTask.getAttribute('id-num'));\n    var detailContent = this.value;\n    var type = 'detail';\n    db.updateDetail(detailID, type, detailContent);\n  };\n\n  return {\n    refreshDetail: refreshDetail\n  };\n}();\n\nmodule.exports = detailModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/DetailModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/Handler.js":
/*!******************************************!*\
  !*** ./app/assets/js/modules/Handler.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 定义事件处理函数\nvar handler = function () {\n  // 加载各模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n  var headerModule = __webpack_require__(/*! ./HeaderModule */ \"./app/assets/js/modules/HeaderModule.js\");\n  var sidebarModule = __webpack_require__(/*! ./SidebarModule */ \"./app/assets/js/modules/SidebarModule.js\");\n  var todolistModule = __webpack_require__(/*! ./TodolistModule */ \"./app/assets/js/modules/TodolistModule.js\");\n  var detailModule = __webpack_require__(/*! ./DetailModule */ \"./app/assets/js/modules/DetailModule.js\");\n  var modalModule = __webpack_require__(/*! ./ModalModule */ \"./app/assets/js/modules/ModalModule.js\");\n  var helperFunction = __webpack_require__(/*! ./HelperFunction */ \"./app/assets/js/modules/HelperFunction.js\");\n\n  // 变量声明\n  var randomFire = document.querySelector('.site-header__random-task__fire');\n  var searchbox = document.querySelector('.site-header__search-box__content');\n  // var input = document.querySelector('.site-header__search-box__input');\n  // var level = document.querySelector('.icon__level');\n  var addBtn = document.querySelector('.icon__add');\n  var themeBtn = document.querySelector('.site-header__theme-btn');\n  var sidebarContent = document.querySelector('.sidebar__content');\n  var deleteData = document.querySelector('.sidebar__delete');\n  var section = document.querySelector('.todolist');\n  var detail = document.querySelector('.detail__paragraph');\n  var modal = document.querySelector('.modal');\n\n  // site-header 区域\n  // 点击触发随机事件\n  randomFire.addEventListener('click', headerModule.randomTask);\n\n  // 开启查找任务功能\n  searchbox.addEventListener('click', headerModule.openSearchTask);\n\n  // 输入框输入数据查找\n  helperFunction.get_input().addEventListener('keyup', headerModule.searchTask);\n\n  // 任务等级切换\n  helperFunction.get_level().onclick = headerModule.changeLevel;\n\n  // 添加任务\n  addBtn.addEventListener('click', headerModule.addTask1);\n\n  // 回车添加任务\n  document.onkeyup = headerModule.addTask2;\n\n  // 主题切换\n  themeBtn.addEventListener('click', headerModule.changeTheme);\n\n  // sideBar 区域\n  // 左侧任务栏类别、等级导航\n  sidebarContent.addEventListener('click', sidebarModule.navigation);\n\n  // 显示删库模态框\n  deleteData.addEventListener('click', sidebarModule.showModalBox);\n\n  // todolist 区域\n  // 修改任务标题\n  section.addEventListener('focusout', todolistModule.changeTaskTitle);\n\n  // 任务已完成功能\n  section.addEventListener('click', todolistModule.finishTask);\n\n  // 删除任务\n  section.addEventListener('click', todolistModule.deleteTask);\n\n  // 点击任务显示详情\n  section.addEventListener('click', todolistModule.showTaskDetail);\n\n  // 右侧任务详情区域\n  detail.addEventListener('focusout', detailModule.refreshDetail);\n\n  // 模态框区域\n  // 是否清空数据库\n  modal.addEventListener('click', modalModule.isDeleteDB);\n}();\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./app/assets/js/modules/Handler.js?");

/***/ }),

/***/ "./app/assets/js/modules/HeaderModule.js":
/*!***********************************************!*\
  !*** ./app/assets/js/modules/HeaderModule.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 定义页面头部处理程序模块\nvar headerModule = function () {\n  // 加载数据库模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n  var helperFunction = __webpack_require__(/*! ./HelperFunction */ \"./app/assets/js/modules/HelperFunction.js\");\n\n  // 变量声明\n  var randomContentNow = ['读完那本英文原著', '中午去睡个好觉', '日语入门学习', '尝试做些家常菜', '了解一些设计常识'];\n  var randomLevel = ['bgc-light', 'bgc-usual', 'bgc-heavy'];\n  var input = document.querySelector('.site-header__search-box__input');\n  var searchbox = document.querySelector('.site-header__search-box__content');\n  var level = document.querySelector('.icon__level');\n  var theme = ['', 'theme-green', 'theme-purple', 'theme-gradual'];\n  var themeIconName = ['#icon-theme', '#icon-theme1', '#icon-theme2', '#icon-theme3'];\n  var siteHeader = document.querySelector('.site-header');\n\n  // 模块内各功能\n  // 触发随机任务功能\n  var randomTask = function randomTask() {\n    var ContentIndex = parseInt(Math.random() * randomContentNow.length);\n    var LevelIndex = parseInt(Math.random() * 3);\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\n    db.randomThingsNow(randomContentNow[ContentIndex], randomLevel[LevelIndex]);\n    db.showTypeThings('taskType', typeValue);\n  };\n\n  // 开启查找任务功能\n  var openSearchTask = function openSearchTask(e) {\n    // 获取左侧栏目对应事件类型\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\n\n    if (e.target.classList.contains('icon__search')) {\n      e.target.classList.toggle('act-color');\n      input.classList.toggle('act-color');\n      searchbox.classList.toggle('act-color');\n      input.focus();\n      input.value = '';\n      db.showTypeThings('taskType', typeValue);\n    }\n  };\n\n  // 查找任务功能\n  var searchTask = function searchTask(e) {\n    if (e.target.classList.contains('act-color')) {\n      db.searchThings(this.value);\n    }\n  };\n\n  // 任务等级切换功能\n  var changeLevel = function changeLevel() {\n    taskToggle();\n    input.focus();\n  };\n\n  // 等级切换函数\n  function taskToggle() {\n    if (level.classList.contains('level-light')) {\n      level.classList.remove('level-light');\n      level.classList.add('level-usual');\n      level.setAttribute('level', 'bgc-usual');\n    } else if (level.classList.contains('level-usual')) {\n      level.classList.remove('level-usual');\n      level.classList.add('level-heavy');\n      level.setAttribute('level', 'bgc-heavy');\n    } else {\n      level.classList.remove('level-heavy');\n      level.classList.add('level-light');\n      level.setAttribute('level', 'bgc-light');\n    }\n  }\n\n  // 添加任务功能\n  var addTask1 = function addTask1() {\n    // 获取左侧栏目对应事件类型\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\n    if (!input.value) {\n      return;\n    } else {\n      db.addThings();\n      db.showTypeThings('taskType', typeValue);\n      input.value = '';\n    }\n  };\n\n  // 按回车键添加任务功能\n  var addTask2 = function addTask2(e) {\n    // 兼容FF和IE和Opera\n    var event = e || window.event;\n    var key = event.which || event.keyCode || event.charCode;\n    // 获取左侧栏目对应事件类型\n    var typeValue = document.querySelector('.sidebar__act').getAttribute('taskType');\n\n    // 焦点在搜索栏并按回车\n    if (document.activeElement.value) {\n      if (key == 13 && document.activeElement.tagName.toUpperCase() === 'INPUT') {\n        db.addThings();\n        db.showTypeThings('taskType', typeValue);\n        input.value = '';\n      }\n    }\n  };\n\n  // 切换主题功能\n  var changeTheme = function changeTheme() {\n    var themeIcon = this.children[0].children[0];\n    // 切换主题数组\n    theme.push(theme.shift());\n    themeIconName.push(themeIconName.shift());\n    // 应用主题\n    siteHeader.setAttribute('class', \"site-header \" + theme[0]);\n    themeIcon.setAttribute('xlink:href', themeIconName[0]);\n  };\n\n  return {\n    randomTask: randomTask,\n    openSearchTask: openSearchTask,\n    searchTask: searchTask,\n    changeLevel: changeLevel,\n    addTask1: addTask1,\n    addTask2: addTask2,\n    changeTheme: changeTheme\n  };\n}();\n\nmodule.exports = headerModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/HeaderModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/HelperFunction.js":
/*!*************************************************!*\
  !*** ./app/assets/js/modules/HelperFunction.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 有疑问！\n\n// 定义 helper 函数\nvar helperFunction = function () {\n  // 获取页面头部 input 引用\n  var get_input = function get_input() {\n    return document.querySelector('.site-header__search-box__input');\n  };\n\n  // 获取页面头部 level 图标引用\n  var get_level = function get_level() {\n    return document.querySelector('.icon__level');\n  };\n\n  return {\n    get_input: get_input,\n    get_level: get_level\n  };\n}();\n\nmodule.exports = helperFunction;\n\n//# sourceURL=webpack:///./app/assets/js/modules/HelperFunction.js?");

/***/ }),

/***/ "./app/assets/js/modules/ModalModule.js":
/*!**********************************************!*\
  !*** ./app/assets/js/modules/ModalModule.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar modalModule = function () {\n  // 加载数据库模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n\n  // 是否清空数据库功能\n  var isDeleteDB = function isDeleteDB(e) {\n    if (e.target.classList.contains('modal__btn-yes')) {\n      this.classList.remove('modal--visible');\n      db.deleteAllThings();\n    } else if (e.target.classList.contains('modal__btn-no')) {\n      this.classList.remove('modal--visible');\n    }\n  };\n\n  return {\n    isDeleteDB: isDeleteDB\n  };\n}();\n\nmodule.exports = modalModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/ModalModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/SidebarModule.js":
/*!************************************************!*\
  !*** ./app/assets/js/modules/SidebarModule.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 定义页面左侧导航处理程序模块\nvar sidebarModule = function () {\n  // 加载数据库模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n\n  // 变量声明\n  var levelBox = [0, 1, 2];\n  var modal = document.querySelector('.modal');\n\n  // 模块内各功能\n  // 左侧导航栏功能\n  var navigation = function navigation(e) {\n    var lis = document.querySelectorAll('.sidebar__list-type');\n    var target = e.target;\n    var firstTask;\n    var firstTaskID;\n\n    // 点击到了任务类别的话\n    if (target.classList.contains('sidebar__list-type')) {\n      lis.forEach(function (ele) {\n        ele.classList.remove('sidebar__act');\n      });\n      target.classList.add('sidebar__act');\n\n      // 展示不同类型任务到页面\n      var typeValue = target.getAttribute('taskType');\n      db.showTypeThings('taskType', typeValue);\n\n      // 更新右侧任务详情--错误代码\n      // CAUTION！ 获取到的 firstTaskID 总是页面更新前的 firstTaskID，导致详情更新慢一步。\n      firstTask = document.querySelector('.todolist__focus');\n      if (firstTask) {\n        firstTaskID = parseInt(firstTask.getAttribute('id-num'));\n        db.showDetail(firstTaskID);\n      }\n    }\n    // 点击到了任务等级的话\n    else if (target.classList.contains('sidebar__list-level')) {\n        levelBox.push(levelBox.shift());\n        var levels = target.children;\n        var thisLevel = levels[levelBox[0]];\n        var levelValue = thisLevel.getAttribute('level');\n\n        // 去除 active 类名\n        Array.prototype.forEach.call(levels, function (e) {\n          e.classList.remove('active');\n        });\n        // 给当前任务等级添加 active\n        thisLevel.classList.add('active');\n        db.showTypeThings('level', levelValue);\n\n        // 更新右侧任务详情--错误代码\n        // CAUTION！ 获取到的 firstTaskID 总是页面更新前的 firstTaskID，导致详情更新慢一步。\n        firstTask = document.querySelector('.todolist__focus');\n        if (firstTask) {\n          firstTaskID = parseInt(firstTask.getAttribute('id-num'));\n          db.showDetail(firstTaskID);\n        }\n      }\n  };\n\n  // 显示删库模态框功能\n  var showModalBox = function showModalBox() {\n    modal.classList.add('modal--visible');\n  };\n\n  return {\n    navigation: navigation,\n    showModalBox: showModalBox\n  };\n}();\n\nmodule.exports = sidebarModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/SidebarModule.js?");

/***/ }),

/***/ "./app/assets/js/modules/TodolistModule.js":
/*!*************************************************!*\
  !*** ./app/assets/js/modules/TodolistModule.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 定义主任务界面模块\nvar todolistModule = function () {\n  // 加载数据库模块\n  var db = __webpack_require__(/*! ./DB */ \"./app/assets/js/modules/DB.js\");\n\n  // 修改任务标题功能\n  var changeTaskTitle = function changeTaskTitle(e) {\n    if (e.target.tagName.toUpperCase() === 'SPAN') {\n      var idNum = parseInt(e.target.getAttribute('id-num'));\n      var newText = e.target.innerText;\n\n      db.modifyThings(idNum, 'title', newText);\n    }\n  };\n\n  // 任务已完成功能\n  var finishTask = function finishTask(e) {\n    if (e.target.classList.contains('icon__nofinish')) {\n      var idNum = parseInt(e.target.getAttribute('id-num'));\n      db.modifyThings(idNum, 'taskType', 'finish');\n\n      // 删除页面上的数据\n      var ele = document.querySelector('#things_' + idNum);\n      ele.parentNode.removeChild(ele);\n    }\n  };\n\n  // 任务删除功能\n  var deleteTask = function deleteTask(e) {\n    if (e.target.classList.contains('icon__delete')) {\n      var idNum = parseInt(e.target.getAttribute('id-num'));\n      db.modifyThings(idNum, 'taskType', 'bin');\n\n      // 删除页面上的数据\n      var ele = document.querySelector('#things_' + idNum);\n      ele.parentNode.removeChild(ele);\n    }\n  };\n\n  // 显示任务详情功能\n  var showTaskDetail = function showTaskDetail(e) {\n    if (e.target.tagName.toUpperCase() === 'LI') {\n      var childNodes = e.target.parentNode.childNodes;\n      var taskID = parseInt(e.target.getAttribute('id-num'));\n      childNodes.forEach(function (e) {\n        e.classList.remove('todolist__focus');\n      });\n\n      e.target.classList.add('todolist__focus');\n      db.showDetail(taskID);\n    }\n  };\n\n  return {\n    changeTaskTitle: changeTaskTitle,\n    finishTask: finishTask,\n    deleteTask: deleteTask,\n    showTaskDetail: showTaskDetail\n  };\n}();\n\nmodule.exports = todolistModule;\n\n//# sourceURL=webpack:///./app/assets/js/modules/TodolistModule.js?");

/***/ })

/******/ });