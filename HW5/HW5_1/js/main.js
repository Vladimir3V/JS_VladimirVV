(function() {

	var triggers  = document.getElementsByClassName("accordeon_trigger"),
		texts     = document.getElementsByClassName("accordeon_trigger-text"),
		accordeon = document.getElementsByClassName("accordeon");

	// Тут перекрашиваем промежуточные элементы аккардена в светлый цвет, 
    // что бы в css не мучатся
	
	for (var j = 1, leng = triggers.length; j < leng ; j+=2){
		triggers[j].classList.add('whiteback');
		texts[j].classList.add('graytype');
	}
	
	// Добавляем прослушку на клик

	document.addEventListener('click', rollDown);
	
	// Функция разворачивает вложеный элемент и укарашет согласно ТЗ
	function rollDown (e) {
		var target = e.target,
			className = target.classList[0],
			inner = target.nextElementSibling,
			text = target.firstElementChild;
		// Проверяем, туда ли именно мы нажали

		if (className == 'accordeon_trigger') {
		
			// Отменяем выдлеление при двойном клике, а то некарсиво
			target.addEventListener('dblclick', noSelect);
			function noSelect() {
				target.onselectstart = function() {
  				return false;
				}
			}
			
			// Навешиваем гирлянду классов 
			
			target.classList.toggle('orangecolor');
			text.classList.toggle('whytetype');
			if(inner !== null) {
			inner.classList.toggle('active');
			}
		}
	}
	
})(); 

