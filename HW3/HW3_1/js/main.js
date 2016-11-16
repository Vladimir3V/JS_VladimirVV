
var array = [0, 1, 2, 3, 4, 5, 6];



// Аналог forEach

function newForEach(anyArr,fn) {
	
	for (let i = 0; i < anyArr.length; i++) {
		fn(anyArr[i],i,anyArr);
	}
}

//тестируем

function consl (item, i, newArr) {
	console.log (item);
}

newForEach(array,consl);


// Аналог filter 

function newFilter (anyArr,fn) {
	var theArr = [],
			 j = 0;
	
	for (var i = 0; i < anyArr.length ; i++) {
		
		if (fn(anyArr[i],i,anyArr)) {
			theArr[j] = anyArr[i];
			j++;
		}
	}
	
	return theArr;
}

console.log (newFilter(array, item => item > 4));


// Аналог map

function newMap (anyArr,fn) {
	var theArr = [];
	
	for (var i = 0; i < anyArr.length ; i++) {
		theArr[i] = fn(anyArr[i],i,anyArr);
	}
	return theArr;
}



// Аналог slice

function newSlice(anyArr, start, end) {
	var theArr = [],
			 j = 0;

	start = (start > 0) ? start : (anyArr.length + start);
	
	if (end !== undefined) {
		end = (end >= 0) ? end : (anyArr.length + end);
	} else {
		end = anyArr.length;
	}
		
	for (let i = start; i < end; i++ ) {
		theArr[j] = anyArr[i];
		j++;
	}
	
	return theArr;
}

console.log (newSlice(array,2,4));
console.log (array.slice(2,4));

// Аналог reduce


function newReduce(anyArr, fn) {
	var res = 0;
	
	for (let i = 0; i < anyArr.length; i++ ) {	
		res = fn(res,anyArr[i],i,anyArr);
	}
	
	return res;
}

// проверка 

function fn (sum, item) {
	sum +=item;
	return sum;
}


console.log(newReduce(array, fn));


 // Аналог splice 

var array1 = [0, 1, 2, 3, 4, 5, 6];


// function newSplice(anyArr, start, delCount) {
	
// 	var theArr = [],
// 			 j = 0;
			

// 	if( delCount < 0) { delCount = 0; } 
	
// 	start = (start > 0) ? start : (anyArr.length + start);	
	
// 	for (let i = start; i < (start + delCount) && i < anyArr.length ; i++ ) {
// 		theArr[j] = anyArr[i];
// 		j++;
// 	}
// 	return theArr;
	
// }

function newSplice(anyArr, start, delCount) {
	
	var theArr = [],
		timArr = [],
			 j = 0;
			

	if( delCount < 0) { delCount = 0; } 
	start = (start > 0) ? start : (anyArr.length + start);	
	
	for (let i = start; i < (start + delCount) && i < anyArr.length ; i++ ) {
		theArr[j] = anyArr[i];
		j++;
	}
	j = 0;
	for (let i = 0; i < anyArr.length; i++) {
		if (i < start || i > (start + delCount) ) {
			timArr[j] = anyArr [i];
			j++;
		} else {
			for (var z = 3; z < arguments.length; z++) {
				timArr[j] = arguments[z];
				j++;
			}
				timArr[j] = (delCount>0) ? anyArr[i+2]:anyArr[i]; 
			j++;
			i = start + delCount;
		}
	}
	anyArr = timArr; // Расскажи как добравться к оригинальному массиву?
	return theArr;	
}













 