var allNumbers = [1, 2, 4, 5, 6, 7, 8],

    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],

    noNumbers = ['это', 'массив', 'без', 'чисел'];




function isSomeTrue(source, filterFn) {

    if (filterFn(source)) {
        return true;
    } else {
        return false;
    }
}

function isNumber(arg) {
    var i = 0;

    function checkTrue() {
        if (i < arg.length) {
            if (typeof (arg[i]) !== 'number') {
                i = i + 1;
                checkTrue();
                return false;
            } else {
                return true;
            }
        }
    }
	return (checkTrue());
}


console.log(isSomeTrue([], isNumber)); // вернет false

console.log(isSomeTrue(allNumbers, isNumber)); //вернет true

console.log(isSomeTrue(someNumbers, isNumber)); //вернет true

console.log(isSomeTrue(noNumbers, isNumber)); //вернет false
