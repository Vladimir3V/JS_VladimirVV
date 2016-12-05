var p = new Promise(function (resolve, reject) {

	// Подключаемся и получаем JSON с городами
	var xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
	xhr.send();

	// Если все ОК передаем ответ через resolve. 
	// Если все плохо то reject
	xhr.addEventListener('load', function () {
		if (xhr.response) {
			resolve(xhr.response);
		} else {
			reject();
		}
	});
});

// Тут then которы у нас реагирует 
p.then(function (obj) {
		var cities = [];
		var key = "",
			h = 0;
		// JSON переделываем в массив и все буквы делаем строчными.
		// Поисковику не должно быть важно в каком регистре мы заносим информацию
		for (let i = 0; i < obj.length; i++) {
			cities[i] = obj[i].name.toLowerCase();
		}

		// Ставим прослушку на ввод данных в форму
		input.addEventListener('keyup', function (event) {
			var kCode = event.key;
			// Это отсекаем все служебные клавиши, кроме Backspace

			if (h) {
				bodd.innerHTML = "<script id=\"entrytemplate\" type=\"text/x-handlebars-template\"><ul id = \"list\">{{#each c}}<li>{{this}}</li>{{/each}}</ul></script>";
			}
			if (kCode.length < 2) {
				key += event.key.toLowerCase();
				addElements();
				h = 1
			} else if (kCode === 'Backspace') {
				key = key.slice(0, key.length - 1);
				addElements();
				h = 1
			}
			// Тут мы ищем совпадения в массиве
			// И снова все города выводим с большой буквы

			function addElements() {
				var c = [],
					j = 0;

				for (let i = 0; i < cities.length; i++) {

					if (cities[i].indexOf(key.trim()) + 1 && key) {
						c[j] = cities[i][0].toUpperCase() + cities[i].slice(1);
						j++;
					} else if (key === " ") {
						c[i] = cities[i][0].toUpperCase() + cities[i].slice(1);
					}
				}

				(() => {
					var source = entrytemplate.innerHTML;
					let templateFn = Handlebars.compile(source);

					let template = templateFn({
						c
					});
					bodd.innerHTML = template;
				})();

			}




		});

	},
	function () {
		console.log("список городов не подгрузился");
	});
































