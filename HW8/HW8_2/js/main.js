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
			'fields': 'bdate,photo_50'
		}, response => {


			if (response.error) {
				reject(new Error(response.error.error_msg));
			} else {

				var a = response;
				a = a.response;

				a.sort( (a, b) => {
					var f = a.bdate?a.bdate.split('.'):[0,0];
					var s = b.bdate?b.bdate.split('.'):[0,0];	

					if (f[0] < 10){ f[0] = '0' + f[0]}
					if (s[0] < 10){ s[0] = '0' + s[0]}
						
					return ((f[1] + f[0]) - (s[1] + s[0]));
				});
					
					
					
				resolve();
			}
		});
	})
}).catch(function (e) {
	alert(`Ошибка: ${e.message}`);
});






