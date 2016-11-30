document.cookie = "name=cook33";
document.cookie = "name1=cook1";
document.cookie = "name2=cook2";
document.cookie = "name3=cook3";


// Переделываем строку document.cookie в объект где свойстово - это имя куки, а значения совйства это значение куки
// Так же создаем нужно количество элементов таблицы

(() => {

	var x = document.cookie,
		tr = document.querySelector('tr'),
		obj = {},
		button;
	
	x?table.setAttribute('border','2px'):1;
	
	x = x.split('; ');
	
	for (let i = 0; i < x.length; i++) {
		x[i] = x[i].split('=');
		if (i > 0) {
			tr = tr.cloneNode(true);
			table.appendChild(tr);
		}
			
		tr.firstElementChild.innerHTML = x[i][0];
		tr.firstElementChild.nextElementSibling.innerHTML = x[i][1];
		button = tr.getElementsByTagName('button');
		button[0].classList.add('action');		
	}
	
	table.addEventListener('click',(e)=>{
		e.preventDefault();
		var target = e.target;
		var tagName = target.tagName;

		if (tagName === 'BUTTON') {
			var delIt = target.closest('tr');
			var name = delIt.firstElementChild.innerHTML;
			var conf = confirm(`Удалить cookie с именем ${name}?`);

			if (conf == true) {
				document.cookie = `${name}=;expires=Tue, 19 Jan 2008 03:14:07 GMT`;
				delIt.remove();	
			}
			if (document.cookie === "") {
				table.remove();	
			}
		}
	});	
})();









 