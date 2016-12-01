var button = document.getElementById('button'),
	wraper = button.parentElement;
var i = 0,
	
	// Создадим объект в который будем все сохранять и изменим его свойство toString
	pos = {
		toString: function() {
		var str = "";	
			for(var prop in pos) {
				if(prop !== 'toString') {
					str = str+`${prop}||${pos[prop]}/`;
				}
			}
		return(str);	
		}
	};

button.addEventListener('click', createElement);


//		Добавляем элемент
function createElement(e) {
	var  style,
		   div,
		    size = 200,
		 topSize = 500,
		leftSize = 1000;
	div = document.createElement('div');
	wraper.appendChild(div);
	
    style = div.style;
	style.backgroundColor = randColor();
	style.width 		  = `${(size * Math.random()|0)}px`;
	style.height 		  = `${(size* Math.random()|0)}px`;
	style.position 		  = "absolute";
	style.top             = `${(topSize* Math.random()|0)}px`;
	style.left            = `${(leftSize* Math.random()|0)}px`;

	// функция геренит случайный цывет;
	function randColor() {
		var col = [];
		for (let i = 0; i < 3; i++) {
			col[i] = 255 * Math.random() | 0;
		}
		col = `rgb(${col[0]},${col[1]},${col[2]})`;
		return col;
	}
	div.setAttribute("class", "block");
	i+=1;
	div.setAttribute("id",(i+""));
	pos[i] = `${style.backgroundColor}||${style.width}||${style.height}||${style.left}||${style.top}`
}


wraper.addEventListener('mousedown', pickAndDrop, true);

function pickAndDrop(e) {
	var start  = [e.clientX, e.clientY],
		target = e.target,
		style,
		x, 
		y,
		id;
	
  	if (target.tagName != 'DIV') return;
	
  	document.addEventListener('mousemove', moveElement);

	x = target.offsetLeft;
	y = target.offsetTop;
	id = target.getAttribute('id');
	style = target.style;
	function moveElement(e) {
		var mXY = [e.clientX, e.clientY];
		target.style.left = `${x-(start[0]-mXY[0])}px`;
		target.style.top = `${y-(start[1]-mXY[1])}px`;
		
		pos[id] = `${style.backgroundColor}||${style.width}||${style.height}||${style.left}||${style.top}`		
		target.addEventListener('mouseup', stop);
		
		function stop() {
			wraper.removeEventListener('mousedown', pickAndDrop);
			document.removeEventListener('mousemove', moveElement);
		}
	}
}


wraper.addEventListener('click', saveCookie);

function saveCookie(e) {
	var target = e.target;
	if (target.getAttribute('id') === 'save') {
		document.cookie = `${pos.toString()}`;
	}
}

(() => {
	var st = document.cookie;
	if(st !== "") {
		var stArr = st.split('/');
		var style;
		stArr.pop();
		for (var i = 0; i < (stArr.length); i++) {
			stArr[i] = stArr[i].split('||');
			div = document.createElement('div');
			div.setAttribute('id',stArr[i][0]);
			style = div.style;
			style.backgroundColor = stArr[i][1];
			style.width 		  = stArr[i][2];
			style.height 		  = stArr[i][3];
			style.position 		  = "absolute";
			style.left            = stArr[i][4];
			style.top             = stArr[i][5];
			wraper.appendChild(div);
		}
	}
})()

refresh.addEventListener('click',() => {
	window.location.reload();
	document.cookie="=;expires=0";
	console.log(11111);
})






 