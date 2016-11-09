var allNumbers = [1, 2, 4, 5, 6, 7, 8],

    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],

    noNumbers = ['это', 'массив', 'без', 'чисел'];




function isAllTrue(source, filterFn) {
    function caughtEx(arr) {
        try {
            if (!arr.length) {
                throw new Error('Empty_array');
            }
        } catch (e) {
            console.log('Используете пустой массив. Это не хорошо');
        }
    }

    caughtEx(source);

    if (filterFn(source)) {
        return true;
    } else {
        return false;
    }
}

function isNumber(arg) {
    var i;
    arg.length === 0 ? arg = [''] : 1;
    for (i = 0; i < arg.length; i++) {
        if (typeof (arg[i]) !== 'number') {
            return false;
        }
    }
    return true;
}

console.log(isAllTrue([], isNumber)); // вернет false и сообщение об отловленной ошибке

console.log(isAllTrue(allNumbers, isNumber)); //вернет true

console.log(isAllTrue(someNumbers, isNumber)); //вернет false

console.log(isAllTrue(noNumbers, isNumber)); //вернет false
