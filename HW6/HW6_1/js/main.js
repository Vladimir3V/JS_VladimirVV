function timer (time) {
	var promise = new Promise(function(resolve, reject) {
		setTimeout(function() {resolve(time)}, time);
	});
	return promise;
}

timer(2000).then (function (time) {
	console.log (`Прошло ${time} секунд`);
});


console.log ('Начало');
