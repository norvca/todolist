var plus = document.querySelector('#nav span');
var list = document.querySelector('#list');

// 删除 todo
list.addEventListener('click', function(e){
	if(e.target.tagName.toUpperCase() === 'SPAN'){
		var parentEle = e.target.parentNode;
		parentEle.parentNode.removeChild(parentEle);
	}
});

// 添加 todo
plus.addEventListener('click', function(){
	var value = this.parentNode.children[1].value;
	if(!value){
		this.parentNode.children[1].classList.toggle('error');
		return;
	}

	var html = '';
	html += '<li><input type="checkbox" name="todo">' + value + '<span>&times;</span> </li>';
	list.innerHTML += html;
});