		var button = document.getElementById('button'),
				wraper = button.parentElement;
				console.log (button);
		console.log (wraper);
		
		button.addEventListener('click', createElement);
		
//		Добавляем элемент
		function createElement() {
				div	= document.createElement('div');
				wraper.appendChild(div);
				style = div.style;
				style.backgroundColor = randColor();
				style.width = `${(200* Math.random()|0)}px`;
				style.height = `${(200* Math.random()|0)}px`;
				style.position = "absolute";
				style.top = `${(500* Math.random()|0)}px`;
				style.left = `${(1000* Math.random()|0)}px`;
				
				// функция геренит случайный цывет;
				function randColor() {
						var col = [];
						for(let i = 0; i < 3; i++) {								
								col[i] = 255 * Math.random()|0;
						}
						col = `rgb(${col[0]},${col[1]},${col[2]})`;
						return col
				}
				
				div.setAttribute("class","block");				
		}
		
		
		wraper.addEventListener('mousedown',pickAndDrop, true);
		
		function pickAndDrop(e) {
				var start = [e.clientX, e.clientY], 
						target = event.target;
				if (target.tagName != 'DIV') return;
				target.addEventListener('mousemove', moveElement);
				
				var x,y;
						x = target.offsetLeft;
						y = target.offsetTop;
				
				function moveElement(e) {
						var mXY = [e.clientX, e.clientY];
						target.style.left = `${x-(start[0]-mXY[0])}px`;
						target.style.top =`${y-(start[1]-mXY[1])}px`;
						
						target.addEventListener('mouseup', stop);
						function stop () {
								wraper.removeEventListener('mousedown',pickAndDrop);
								target.removeEventListener('mousemove',moveElement);
						}
				}
		}














 