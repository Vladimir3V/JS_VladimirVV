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
				})();
			}
		});
	});
}).catch(function (e) {
	alert(`Ошибка: ${e.message}`);
});

var a = "";
var b = "";

yourFriendSearch.addEventListener('keyup', sort);
chosenFriendSearch.addEventListener('keyup', sort);

function sort(e) {
	var eClass = e.path[2].getAttribute('class'),
		fList = [];

	if (eClass == 'friendSearch') {
		fList = yourFriendsItems.getElementsByClassName('listItem');
		a = actionEl(a);
		showEl(a);

	} else {
		fList = chosenFriendsItems.getElementsByClassName('listItem');
		b = actionEl(b);
		showEl(b);
	}


	function actionEl(key) {
		var kCode = e.key;

		// Это отсекаем все служебные клавиши, кроме Backspace
		if (kCode.length < 2) {
			key += event.key.toLowerCase();
		} else if (kCode === 'Backspace') {
			key = key.slice(0, key.length - 1);
		}
		return key;
	}

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




wrapper.addEventListener('mousedown', pickAndDrop, true);

function pickAndDrop(e) {
	var start = [e.clientX, e.clientY],
		target = e.target,
		x,
		y,
		newElem;

	if (target.getAttribute('id') != 'friendInfo') return;

	newElem = target.cloneNode(true);

	newElem.style.position = 'absolute';
	newElem.style.width = '320px';
	newElem.style.height = '45px';
	newElem.style.background = 'yellow';
	newElem.style.left = target.offsetLeft + 'px';
	newElem.style.top = target.offsetTop + 'px';
	newElem.style.opacity = ''



	body.appendChild(newElem);



	document.addEventListener('mousemove', moveElement);

	x = newElem.offsetLeft;
	y = newElem.offsetTop;

function moveElement(e) {
	var mXY = [e.clientX, e.clientY];
	newElem.style.left = `${x-(start[0]-mXY[0])}px`;
	newElem.style.top = `${y-(start[1]-mXY[1])}px`;

	newElem.addEventListener('mouseup', stop);

	function stop(e) {
		var pap = target.parentNode.parentNode.getAttribute('id'),
			text = target.getElementsByTagName('span')[0].innerHTML,
			fItems;
		console.log(text);

		if (pap == 'chosenFriendsItems') {
			if (mXY[0] > yourFriends.offsetLeft &&
				mXY[0] < (yourFriends.offsetLeft + yourFriends.offsetWidth)) {
				fItems = yourFriendsItems.getElementsByClassName('name');
				for (var i = 0; i < fItems.length; i++) {
					if (fItems[i].innerHTML == text) {
						fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
						target.parentNode.classList.add('active');
					}
				}
			}
		} else if (pap == 'yourFriendsItems') {
			if (mXY[0] < chosenFriends.offsetLeft &&
				mXY[0] > (chosenFriends.offsetLeft - chosenFriends.offsetWidth)) {
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

document.addEventListener('click', addRemove)

function addRemove(e) {
	let target = e.target,
		text,
		fItems;
	if (e.target.getAttribute('class') != 'picture') {return}
			var	pop =	target.parentNode.parentNode.parentNode.parentNode.getAttribute('id');


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
target.parentNode.parentNode.parentNode.classList.add('active');		text = target.parentElement.previousElementSibling.firstElementChild.innerHTML;

			fItems = yourFriendsItems.getElementsByClassName('name');
			for (var i = 0; i < fItems.length; i++) {
					if (fItems[i].innerHTML == text) {		
						fItems[i].parentNode.parentNode.parentNode.classList.remove('active');
				}
			}
		}
	

}
