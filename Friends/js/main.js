//new Promise(function (resolve) {
//	if (document.readyState == 'complete') {
//		resolve();
//	} else {
//		window.onload = resolve;
//	}
//}).then(function () {
//	return new Promise(function (resolve, reject) {
//		VK.init({
//			apiId: 5758824
//		});
//
//		VK.Auth.login(function (response) {
//			if (response.session) {
//				resolve(response);
//			} else {
//				reject(new Error('Не удалось авторизоваться'));
//			}
//		}, 2);
//	});
//}).then(function () {
//	return new Promise(function (resolve, reject) {
//		VK.api('friends.get', {
//			'order' : 'name',
//			'fields': 'bdate,photo_50'
//		}, response => {
//
//
//			if (response.error) {
//				reject(new Error(response.error.error_msg));
//			} else {
//
//				var a = response;
//				a = a.response;
//
//				(() => {
//					var source = entrytemplate.innerHTML;
//					var templateFn = Handlebars.compile(source);
//
//					var context = templateFn({
//						list: a
//					});
//					yourFriendsItems.innerHTML = context;
//					chosenFriendsItems.innerHTML = context;
//				})();
//			resolve();
//
//		}
//	});
//			});
//}).catch(function (e) {
//	alert(`Ошибка: ${e.message}`);
//});

var a = "";
var b = "";

yourFriendSearch.addEventListener('keyup', sort);
chosenFriendSearch.addEventListener('keyup', sort);

function sort(e) {
	var eClass = e.path[2].getAttribute('class'),
		fList = [];

	if (eClass == 'friendSearch') {
		fList = yourFriendsItems.getElementsByClassName('listItem');
		actionEl(a);
	} else {
		fList = chosenFriendsItems.getElementsByClassName('listItem');
		actionEl(b);
	}


	function actionEl(key) {
		var kCode = e.key;

		// Это отсекаем все служебные клавиши, кроме Backspace
		if (kCode.length < 2) {
			key += event.key.toLowerCase();
			showEl();
		} else if (kCode === 'Backspace') {
			key = key.slice(0, key.length - 1);
			showEl();
		}

		function showEl() {
			var c;
			for (var i = 0; i < fList.length; i++) {
				c = fList[i].getElementsByTagName('span')[0].innerHTML;
				c = c.toLowerCase();
				console.log(key);

				if (c.indexOf(key) == -1 && key !== "") {
					fList[i].classList.add('active');
				} else {
					fList[i].classList.remove('active');
				}
			}
		}
	}
}



