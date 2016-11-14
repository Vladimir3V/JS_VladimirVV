function isSimilarObj(objA, objB) {
		
		
	var objArr = Object.keys(objA),
		   res = true;
	
	function getVal(obj, prop) {
		return (Object.getOwnPropertyDescriptor(obj, prop)).value;
	}

	for (var i = 0; i < objArr.length; i++) {
		var valA = getVal(objA,objArr[i]),
			valB = getVal(objB,objArr[i]);
		
			console.log(valA,valB);
				
		if (valA === valB) {
		} else if ((valA instanceof Date) && (valA - valB) !== 0) {
			res = false;
		} 
		else if (
			typeof(valA) == 'object' && 
			typeof (valB) == 'object'
		) {
			if(!isSimilarObj(valA,valB)) {	
				res = false;
			}
		} else {
			res = false;
		}
	}
	return res;	
}


// тест

var objA = {

    prop1: 'value1',

    prop2: 'value2',

    prop3: 'value3',

    prop4: {

        subProp1: 'sub value1',

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        }

    },

    prop5: 1000,

    prop6: new Date(2016, 2, 10)

};



var objB = {

    prop5: 1000,

    prop3: 'value3',

    prop1: 'value1',

    prop2: 'value2',

    prop6: new Date('2016/03/10'),

    prop4: {

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        },

        subProp1: 'sub value1'

    }

};

console.log(isSimilarObj(objA,objB));














 