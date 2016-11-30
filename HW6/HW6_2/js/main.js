var p = new Promise (function(resolve, reject) {
	
	var xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open('GET','https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
	xhr.send();	
		
	xhr.addEventListener('load',function(){
		if(xhr.response) {
			resolve(xhr.response);
		} else {
			reject();
		}
	});	
});

p.then(function(obj){
	var cities = [];
	for (var i = 0; i<obj.length; i++) {
		cities[i] = " " + obj[i].name;
	}
	
	citylist.textContent = `${cities.sort()}`;
},
function(){
	console.log("По ссылке неверная информация или ссылка ошибочная");
});



