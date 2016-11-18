ДЗ - 1

function prepend(arg1, arg2) {
	list.insertBefore(arg1, arg2);
}

// проверка

var newLi = document.createElement('li');
 newLi.innerHTML = 'Привет, мир!';
console.log(newLi);
var elem = document.getElementsByClassName("first");
console.log(elem);
prepend(newLi, elem[0]);
 
































