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

				a.sort((a, b) => {
					var f = a.bdate ? a.bdate.split('.') : [0, 0];
					var s = b.bdate ? b.bdate.split('.') : [0, 0];
					
					var start = new Date(),
							day = start.getDate();
					
					if (day < 10) {
						day = '0' + day;
					}
					
					now = Number(start.getMonth()+1) + "" + day;					
					
					if (f[0] < 10) {
						f[0] = '0' + f[0];
					}
					if (s[0] < 10) {
						s[0] = '0' + s[0];
					}
					
					
					var a =  Number(f[1] + f[0]);
					var b =  Number(s[1] + s[0]);
					
					if (a === 0 && b === 0 ) {
						return 1
					} else if (a === 0 && b > 0) {
						return 1
					} else if (b === 0 && a > 0) {
						return -1
					} else if (a >= now && b >= now) {
						if (a > b){return 1} 
						if (a < b){return -1}
					} else if (a < now && b > now) {
						return 1;
					} else if (a > +now && b < +now) {
						return -1;
					} else if ( a < now && b < now) {
						if (a > b){return 1} 
						if (a < b){return -1}
					}
				
				});

				(() => {
					var source = entrytemplate.innerHTML;
					var templateFn = Handlebars.compile(source);

					var context = templateFn({
						list: a
					});
					main.innerHTML = context;
				})();
			}
			resolve();
		});
	})
}).catch(function (e) {
	alert(`Ошибка: ${e.message}`);
});


