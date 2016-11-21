//ДЗ - 4
//

// Объявляем функцию которая выведет статистику по странице


function getStat() {
	
	var parent    = document,
		childsArr = [], // это массив всех элементов на странице
		classArr  = []; // это массив всех классов 

	// Эта функция соберет нам все классы и элементы на странице
	(function getAllChilds(parent){
		for (vol of parent.childNodes) {  // проходим циклом и собираем все элементы
			childsArr.push(vol);
			
			// Проверяем что класс все таки есть и только тогда сохраняем
			if (vol.className !== undefined && vol.className !== "") {
				classArr.push(vol.className);
			}
			
			getAllChilds(vol); // рекурсия в дочерние элементы
		}
	})(parent);
	
	// Эта функция соберет все теги и классы в один объект 
	
	function collectStat (){
		var stat = {};
		
		stat['tags'] = {};
		
		for (vol of childsArr) {			
			switch (vol.nodeType){
				case 1:
					if ((stat['tags'].hasOwnProperty([vol.tagName]))) {
						stat['tags'][vol.tagName] +=1;
					} else {
						stat['tags'][vol.tagName] = 1;
					}
					break;
				case 3:
					if ('text' in stat) {
						stat.text +=1;
					} else {
						stat['text'] = 1;
					}
					break;
				default:
					if ('others' in stat) {
						stat.vol = stat.vol + ',' + vol;  ;
					} else {
						stat['others'] = vol;
					}
			}
		}
		
		
		if(classArr) {
			stat['classes'] = {};
			for (vol of classArr) {
				if(classArr) {
					if (stat['classes'].hasOwnProperty([vol])){
						tat['classes'][vol] +=1;
					} else {
						stat['classes'][vol] = 1;
					}
				}
			}
		}
	return stat;
	}
	
	// Эта функция выводит в консоль данные
	
	console.log (collectStat ());
	
	(function pushStat(){
		var data = collectStat();
		for (prop in data['tags']) {
			console.log(`Тегов ${prop} : ${data['tags'][prop]}`);
		}
		for (prop in data['classes']) {
			console.log(`Тегов с классом ${prop} : ${data['classes'][prop]}`);
		}
		console.log(`Текстовых узлов : ${data['text']}`);
		
	})();
	
}

getStat();






























