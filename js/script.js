(function(){
	// 准备工作
	var db;

	// 初始化数据库
	function initDB(){
		var request = window.indexedDB.open('todoDB',1);

		// 成功与失败
		request.onsuccess = function(){
			db = this.result;
			// console.log('开启数据库成功！');
			showThings();
		};
		request.onerror = function(){
			// console.log('开启数据库失败:');
		};

		// 建立事件库与索引
		request.onupgradeneeded = function(){
			db = this.result;
			// 建立对象仓库
			if(!db.objectStoreNames.contains('todoDB')){
				// 创建对象
				var store = db.createObjectStore('todoStore',{keyPath: 'id', autoIncrement: true});
				// 指定可索引字段
				store.createIndex('thing', 'thing', {unique: false});
			}
		};
	}

	// 添加数据到数据库
	function addThings(){
		var thing = document.querySelector('#nav input').value;
		var transaction = db.transaction(['todoStore'], 'readwrite');
		var store = transaction.objectStore('todoStore');

		// 定义 todoStore
		var todos = {
			thing: thing,
			isFinished: false
		};

		// 添加事件
		var request = store.add(todos);

		// 添加成功与失败
		request.onsuccess = function(){
			// console.log('事件添加到数据库成功!');
		};

		request.error = function(){
			// console.log('事件添加到数据库失败!');
		};
	}

	// 展示数据到页面
	// caution！这段写的有问题导致添加的事件不能按顺序排列
	function showThings(){
		var transaction = db.transaction(['todoStore'], 'readwrite');
		var store = transaction.objectStore('todoStore');
		var index = store.index('thing');

		var output = '';
		index.openCursor().onsuccess = function(e){
			var cursor = e.target.result;
			if(cursor){
				output += '<li dataID='+ cursor.value.id +' id=todo' + cursor.value.id + '>';
				output += '<input type="checkbox" name="todo">';
				output += '<label>'+ cursor.value.thing +'</label>';
				// 直接在这里点击调用 deleteThings() 会说is not defined，为什么？
				output += '<span>&times;</span>';
				output += '</li>';
				// 这句什么意思？
				cursor.continue();
			}
			document.querySelector('main #list').innerHTML = output;
		};
	}

	// 删除数据库中数据
	function deleteThings(id){
		// 删除数据库中数据
		var transaction = db.transaction(['todoStore'], 'readwrite');
		var store = transaction.objectStore('todoStore');
		var request  = store.delete(id);
		request.onsuccess = function(){
			// console.log('删除数据: '+ id +' 成功!');
		};

		// 删除页面元素
		var eleID = '#todo'+id;
		var ele = document.querySelector(eleID);
		ele.parentNode.removeChild(ele);
	}

	// 开启事件
	function addEvents(){
		initDB();

		// 添加事件
		document.querySelector('#nav span').addEventListener('click', function(){
			if(document.querySelector('#nav input').value) {
				addThings();
				showThings();
			}
		});

		// 删除事件
		document.querySelector('#list').addEventListener('click', function(e){
			if(e.target.tagName.toUpperCase() === 'SPAN'){
				var parentEle = e.target.parentNode;
				var dataID = parentEle.getAttribute('dataID');
				var num = parseInt(dataID);

				deleteThings(num);
			}
		});
	}

	addEvents();
})();