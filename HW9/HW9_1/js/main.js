// ES6

class calculator1 {
	constructor() {
		this.firstN = arguments[0];	}
	sum() {
		var res = 0;
		for ( var i = 0; i < arguments.length; i++) {
			res = res + arguments[i];
		}
		return (res + this.firstN);
	}
	dif() {
		var i,
			dif = 0;
		for (i = 0; i < arguments.length; i++) {
			dif = dif - arguments[i];
		}
		return (dif + this.firstN);
	}

	div() {
		var i,
			div = 1;
		try {
			for (i = 0; i < arguments.length; i++) {
				div = div * arguments[i];
				if (div == 0) {
					throw new Error('DEV_BY_ZERO');
				}
			}
		} catch (e) {
			console.log('Деление на 0, но ответ все равно будет!');
		} finally {
			return (this.firstN / div);
		}
	}

	mul() {
		var i,
			mul = 1;
		for (i = 0; i < arguments.length; i++) {
			mul = mul * arguments[i];
		}
		
		return (this.firstN * mul);
	}
}

class SqlCalc extends calculator1 {
	sum () {
		var res = super.sum.apply(this,arguments);
		return (res * res);
	}
	dif () {
		var res = super.dif.apply(this,arguments);
		return (res * res);
	}
	div () {
		var res = super.div.apply(this,arguments);
		return (res * res);
	}
	mul () {
		var res = super.mul.apply(this,arguments);
		return (res * res);
	}
}

let myCalculator1 = new SqlCalc(100);

console.log(myCalculator1.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator1.dif(10, 20)); //вернет 4 900
console.log(myCalculator1.div(2, 2)); //вернет 625
console.log(myCalculator1.mul(2, 2)); //вернет 160 000


// ES5


var calculator = function() {
	this.firstN = arguments[0];
}

calculator.prototype.sum = function() {
	var res = 0;
		for ( var i = 0; i < arguments.length; i++) {
			res = res + arguments[i];
		}
		return (res + this.firstN);
}

	calculator.prototype.dif = function() {
		var i,
			dif = 0;
		for (i = 0; i < arguments.length; i++) {
			dif = dif - arguments[i];
		}
		return (dif + this.firstN);
	}

	calculator.prototype.div = function() {
		var i,
			div = 1;
		try {
			for (i = 0; i < arguments.length; i++) {
				div = div * arguments[i];
				if (div == 0) {
					throw new Error('DEV_BY_ZERO');
				}
			}
		} catch (e) {
			console.log('Деление на 0, но ответ все равно будет!');
		} finally {
			return (this.firstN / div);
		}
	}

	calculator.prototype.mul = function() {
		var i,
			mul = 1;
		for (i = 0; i < arguments.length; i++) {
			mul = mul * arguments[i];
		}
		return (this.firstN * mul);
	}
	
	
	var c = new calculator(100);

	

	
	var SqrCalc = function (){	this.firstN = arguments[0];
};
//inherit(SqrCalc,calculator);

SqrCalc.prototype = Object.create(calculator.prototype);
SqrCalc.prototype.constructor = SqrCalc;
SqrCalc.prototype.calculator = calculator;


SqrCalc.prototype.sum = function () {
	let answer = this.calculator.prototype.sum.apply(this, arguments);
	return (answer * answer)
}

SqrCalc.prototype.dif = function () {
	let answer = this.calculator.prototype.dif.apply(this, arguments);
	return (answer * answer)
}

SqrCalc.prototype.div = function () {
	let answer = this.calculator.prototype.div.apply(this, arguments);
	return (answer * answer)
}

SqrCalc.prototype.mul = function () {
	let answer = this.calculator.prototype.mul.apply(this, arguments);
	return (answer * answer)
}


let myCalculator = new SqrCalc(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000

	
	
	
	

