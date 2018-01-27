var todoAPP = (function(){
	var db,
		addBtn = document.querySelector('.icon-add'),
		level = document.querySelector('.icon-level'),
		toDayString = new Date().toString(),
		thisWeek = toDayString.slice.call(toDayString, 0, 3).toUpperCase(),
		section = document.querySelector('section');

	function initDB(){
		// 打开数据库
		var request = window.indexedDB.open('todoAPP', 1);
		// 成功
		request.onsuccess = function(){
			console.log('开启数据库成功！');
			db = this.result;
			showThings();
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
				store.createIndex('id', 'id', {unique: false});
			}
		};
	}

	// 获取必要任务相关属性
	var prop = (function(){

		// 获取任务等级
		function getLevel(){
			if(level.classList.contains('level-light')) {
				console.log('level-light!');
			} else if(level.classList.contains('level-common')) {
				console.log('level-common!');
			} else {
				console.log('level-heavy!');
			}
		}

		return {
			level: getLevel
		};
	})();

	// 搜索栏选择切换任务等级
	function taskToggle(){
		if( level.classList.contains('level-light') ) {
			level.classList.remove('level-light');
			level.classList.add('level-common');
			level.setAttribute('level', 'bgc-common');
		} else if ( level.classList.contains('level-common') ) {
			level.classList.remove('level-common');
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
		var title = document.querySelector('#serach-input').value;
		var taskLevel = level.getAttribute('level');
		var taskTime = new Date().toLocaleDateString();



		var transaction = db.transaction(['todoStore'], 'readwrite');
		// 请求数据对象
		var store = transaction.objectStore('todoStore');

		// 定义 todoStore
		var todos = {
			title: title,
			detail: null,
			level: taskLevel,
			taskTime: taskTime
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

	// 在页面展示数据
	function showThings(){
		var transaction = db.transaction(['todoStore'], 'readwrite');

		var toDay = new Date().toLocaleDateString();

		// 请求数据对象
		var store = transaction.objectStore('todoStore');
		var taskid = store.index('id');
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

		// 遍历游标 刷新任务到页面
		taskid.openCursor(IDBKeyRange.upper, 'prev').onsuccess = function(e){

			var cursor = e.target.result;
			if(cursor){
				output += '<li id="things_'+ cursor.value.id +'" class="todo-box '+ cursor.value.level +'">';
				output +='<div class="todo-title"><span>'+ cursor.value.title+'</span></div>';
				// console.log(output)
				output += '<div class="todo-icon">';
				output += '  <svg class="icon icon-nofinish" aria-hidden="true" name="search">';
				output += '    <use xlink:href="#icon-finish-copy"></use>';
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
			console.log('删除任务成功！');

			// 删除页面上的数据
			var ele = document.querySelector('#things_'+ id);
			ele.parentNode.removeChild(ele);
		};
	}

	initDB();

	// 事件处理程序
	// 添加任务
	addBtn.onclick = function(){
		// timeCheck();
		addThings();
		showThings();
	};

	// 回车添加任务
	document.onkeyup = function(e) {
		// 兼容FF和IE和Opera
		var event = e || window.event;
		var key = event.which || event.keyCode || event.charCode;
		if (key == 13) {
			addThings();
			showThings();
		}
	};

	// 删除任务
	document.querySelector('section').onclick = function(e){
		if(e.target.classList.contains('icon-delete')){
			var idNum = parseInt( e.target.getAttribute('id-num') );
			deleteThings(idNum);
		}
	};

	// 任务等级切换
	level.onclick = function(){
		taskToggle();
	};
})();