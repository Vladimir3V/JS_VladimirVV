var p = new Promise (function(resolve, reject) {
	
	// Подключаемся и получаем JSON с городами
	var xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open('GET','https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
	xhr.send();	
	
	// Если все ОК передаем ответ через resolve. 
	// Если все плохо то reject
	xhr.addEventListener('load',function(){
		if(xhr.response) {
			resolve(xhr.response);
		} else {
			reject();
		}
	});	
});

// Тут then которы у нас реагирует 
p.then(function(obj) {
	var cities = [];
		var key = "";
	// JSON переделываем в массив и все буквы делаем строчными.
	// Поисковику не должно быть важно в каком регистре мы заносим информацию
	for (let i = 0; i < obj.length; i++) {
		cities[i] = obj[i].name.toLowerCase();
	}
	
	console.log(cities);
		// Ставим прослушку на ввод данных в форму
		input.addEventListener('keyup',function(event){
			var kCode = event.key;
			// Это отсекаем все служебные клавиши, кроме Backspace
			if (kCode.length < 2) {
				key += event.key.toLowerCase();
				addElements();
			} else if( kCode === 'Backspace')  {
				key = key.slice(0, key.length-1);
				addElements();
			}
			
			
			// Тут мы ищем совпадения в массиве
			// И снова все города выводим с большой буквы
			
			function addElements() {
				console.log(1111);
				
				
				var source = entrytemplate.innerHTML;
				let templateFn = Handlebars.compile(source);
				
				let template = templateFn({cities});
				console.log(template);
				bodd.innerHTML = template;
			
//				for(let i = 0; i < cities.length; i++) {
//					c = cities[i];
//					if (c.indexOf(key) + 1 && c && key) {
//						c = c[0].toUpperCase() + c.slice(1);
//						var elem = document.createElement('li');
//						elem.innerHTML = c;
//						citylist.appendChild(elem);
//					}
//				}
			}
		});
	
},
function(){
	console.log("список городов не подгрузился");
});
































