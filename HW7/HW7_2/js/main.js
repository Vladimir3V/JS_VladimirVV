document.cookie = "name=cook33";
document.cookie = "name1=cook1";


//Функция рисует таблицы
function add(a, b) {
	table.setAttribute('border', '2px')
	tr = document.querySelector('tr');
	tr = tr.cloneNode(true);
	table.appendChild(tr);
	tr.firstElementChild.innerHTML = a;
	tr.firstElementChild.nextElementSibling.innerHTML = b;
	button = tr.getElementsByTagName('button');
	button[0].classList.add('action');
}

//Функция парсит куки
(() => {
	var x = document.cookie,
		obj = {},
		button;

	x = x.split('; ');
	table.firstElementChild.classList.add('button');
	for (let i = 0; i < x.length; i++) {

		x[i] = x[i].split('=');
		add(x[i][0], x[i][1]);
	}
})();

// Удаляем куки
(() => {
	table.addEventListener('click', (e) => {
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
				table.setAttribute('border', '0px')
			}
		}
	});
})();


// Добавляет куки
(() => {
	document.addEventListener('submit', function (e) {
		e.preventDefault();
		
		var form = document.forms['form'],
			kName = form.elements['name'].value,
			kVal = form.elements['value'].value,
			kDay = +form.elements['day'].value;
		if (kDay === "" || kVal === "" || kDay === "") {
			alert('Заполните все поля формы');
		} else if (typeof (kDay) != 'number' || isNaN(kDay)) {
			alert('CookieLife должно быть числом');
		} else {
			var today = new Date().getTime(),
				nextday = new Date();
			nextday.setTime(today + kDay * 86400000);
			document.cookie = `${kName}=${kVal};expires=${nextday}`;
			form.reset();
			add(kName, kVal);
		}
	})
})();






 