// Тут подключаемся к VK.SDK

new Promise(function (resolve) {
	if (document.readyState == 'complete') {
		resolve();
	} else {
		window.onload = resolve;
	}
}).then(function () {
	return new Promise(function (resolve, reject) {
		VK.init({
			apiId: 5758824
		});

		VK.Auth.login(function (response) {
			if (response.session) {
				resolve(response);
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, 2);
	});
}).then(function () {

	// Тут получаем данные нужные для дальнейшей работы

	return new Promise(function (resolve, reject) {
		VK.api('friends.get', {
			'order': 'name',
			'fields': 'bdate,photo_50'
		}, response => {


			if (response.error) {
				reject(new Error(response.error.error_msg));
			} else {

				var a = response;
				a = a.response;

				// Создаем шаблоны heandleBars и заполнем конетнтом страницу
				// Создаю 2 шаблона потому что ч одним шаблоном не красиво получается

				(() => {
					var source = entrytemplate.innerHTML;
					var templateFn = Handlebars.compile(source);
					var context = templateFn({
						list: a
					});

					yourFriendsItems.innerHTML = context;

					var source = entrytemplate2.innerHTML;
					var templateFn = Handlebars.compile(source);
					var context = templateFn({
						list: a
					});
					chosenFriendsItems.innerHTML = context;
					

					if (sessionStorage.getItem('chosFr') != null) {
						var names = JSON.parse(sessionStorage.getItem('chosFr'));
						let listF = yourFriendsItems.getElementsByTagName('LI');
						let listC = chosenFriendsItems.getElementsByTagName('LI');

						for (let val of names) {
							for (let i = 0; i < listF.length; i++) {	
								if (val == listC[i].getElementsByClassName('name')[0].innerHTML) {
									listC[i].classList.remove('active');
									listF[i].classList.add('active');
								}
							}
						}
					}

				})();
			}
		});
	});
}).catch(function (e) {
	alert(`Ошибка: ${e.message}`);
});


// ПРоверяем что пользователь вносит в input

wSearch.addEventListener('input', sort);

function sort(e) {
	var fList = [],
		key;

	// Отслеживаем в какой input вносятся даные

	if (
		e.target.parentElement.parentElement.getAttribute('id') == 'yourFriendSearch'
	) {
		fList = yourFriendsItems.getElementsByClassName('listItem');
		key = (e.target.value).toLowerCase();
		showEl(key);
	} else if (
		e.target.parentElement.parentElement.getAttribute('id') == 'chosenFriendSearch'
	) {
		key = (e.target.value).toLowerCase();
		fList = chosenFriendsItems.getElementsByClassName('listItem');
		showEl(key);
	}

	// Эта функция навешивает класс с display: none на элементы которые не удовлетворяют условию

	function showEl(key) {
		var c;
		for (var i = 0; i < fList.length; i++) {
			c = fList[i].getElementsByTagName('span')[0].innerHTML;
			c = c.toLowerCase();
			console.log(key);

			if (c.indexOf(key) == -1 && key !== "") {
				fList[i].classList.add('action');
			} else {
				fList[i].classList.remove('action');
			}
		}
	}
}


// Тут реализуем pickAndDrop

wrapper.addEventListener('mousedown', pickAndDrop, true);

function pickAndDrop(e) {
	var start = [e.clientX, e.clientY],
		target = e.target,
		x,
		y,
		newElem;

	if (target.getAttribute('id') != 'friendInfo') return;

	//создаем клон элемента по которому нажали

	newElem = target.cloneNode(true);

	newElem.style.position = 'absolute';
	newElem.style.width = '280px';
	newElem.style.height = '50px';
	newElem.style.left = target.offsetLeft + 'px';
	newElem.style.top = target.offsetTop + 'px';
	newElem.style.opacity = '0.8';
	newElem.style.background = '#e8e5e5';

	// И добаляем его на старницу
	body.appendChild(newElem);


	// Отслеживаем его перемещение
	document.addEventListener('mousemove', moveElement);

	x = newElem.offsetLeft;
	y = newElem.offsetTop;

	function moveElement(e) {
		var mXY = [e.clientX, e.clientY];
		newElem.style.left = `${x-(start[0]-mXY[0])}px`;
		newElem.style.top = `${y-(start[1]-mXY[1])}px`;

		// и отслеживем его перемещение

		newElem.addEventListener('mouseup', stop);

		function stop(event) {
			var pap = target.parentNode.parentNode.getAttribute('id'),
				text = target.getElementsByTagName('span')[0].innerHTML,
				fItems;

			// Отслеживаем попала ли мышка с элементом в границы блока
			// Если да то зеркальный элемент становится видимым, а исходный невидимым
			// созданй элемент удаляется 
			// Если мы переместили элемент не туда, то он просто исчезнет

			if (pap == 'chosenFriendsItems') {
				if (
					event.clientX > yourFriends.offsetLeft &&
					event.clientX < (yourFriends.offsetLeft + yourFriends.offsetWidth) &&
					event.clientY > yourFriends.offsetTop &&
					event.clientY < (yourFriends.offsetTop + yourFriends.offsetHeight)
				) {
					fItems = yourFriendsItems.getElementsByClassName('name');
					for (var i = 0; i < fItems.length; i++) {
						if (fItems[i].innerHTML == text) {
							fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
							target.parentNode.classList.add('active');
						}
					}
				}
			} else if (pap == 'yourFriendsItems') {

				if (
					event.clientX > chosenFriends.offsetLeft &&
					event.clientX < (chosenFriends.offsetLeft + chosenFriends.offsetWidth) &&
					event.clientY > chosenFriends.offsetTop &&
					event.clientY < (chosenFriends.offsetTop + chosenFriends.offsetHeight)
				) {

					fItems = chosenFriendsItems.getElementsByClassName('name');
					for (var i = 0; i < fItems.length; i++) {
						if (fItems[i].innerHTML == text) {
							fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
							target.parentNode.classList.add('active');
						}
					}
				}
			}
			newElem.remove();
			wrapper.removeEventListener('mousedown', pickAndDrop);
			document.removeEventListener('mousemove', moveElement);
		}
	}
}

// Тут отслеживаем нажатие на крестик 

document.addEventListener('click', addRemove)

function addRemove(e) {
	let target = e.target,
		text,
		fItems;
	//Проверяем что нажали по картинке

	if (e.target.getAttribute('id') != 'pict') {

		return
	}
	var pop = target.parentNode.parentNode.parentNode.parentNode.getAttribute('id');

	// Проверяем с какой стороны нажали
	// И исходя из этого скрывам ондин элемент по которому нажали
	// и открываем зеркальный

	if (pop == 'yourFriendsItems') {
		target.parentNode.parentNode.parentNode.classList.add('active');
		text = target.parentElement.previousElementSibling.firstElementChild.innerHTML;
		fItems = chosenFriendsItems.getElementsByClassName('name');
		for (var i = 0; i < fItems.length; i++) {
			if (fItems[i].innerHTML == text) {
				fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
			}
		}


	} else if (pop == 'chosenFriendsItems') {
		target.parentNode.parentNode.parentNode.classList.add('active');
		text = target.parentElement.previousElementSibling.firstElementChild.innerHTML;

		fItems = yourFriendsItems.getElementsByClassName('name');
		for (var i = 0; i < fItems.length; i++) {
			if (fItems[i].innerHTML == text) {
				fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
			}
		}
	}
}

// Это мы обрабытываем нажатие на кнопку сохранить
// И сохраняем их в localstorage

saveButton.addEventListener('click', saveData);

function saveData(ev) {
	ev.target.style.opacity = '0.7';
	setTimeout(() => ev.target.style.opacity = '1', 100);

	var saveList = [];
	var chosFr = chosenFriendsItems.getElementsByTagName('LI');
	for (let clas of chosFr) {
		if (clas.classList[1] != 'active') {
			saveList.push( clas.getElementsByClassName('name')[0].innerHTML);
		}
	}


	sessionStorage.setItem("chosFr", JSON.stringify(saveList));
}

//Пасхальная кнопка, очистить localstorage

cleanButton.addEventListener('click', cleanData);

function cleanData() {
	sessionStorage.clear();

}