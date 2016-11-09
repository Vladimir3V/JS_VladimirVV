function calculator(firstNumber) {
	var calc = {
		firstN: firstNumber,
		sum: function () {
			var i,
				sum = 0;
			for (i = 0; i < arguments.length; i++) {
				sum = sum + arguments[i];
			}
			return (sum + this.firstN);
		},

		dif: function () {
			var i,
				dif = 0;
			for (i = 0; i < arguments.length; i++) {
				dif = dif - arguments[i];
			}
			return (dif + this.firstN);
		},

		div: function () {
			var i,
				div = 1;
			try {
				for (i = 0; i < arguments.length; i++) {
					div = div * arguments[i];
					if (div === 0) {
						throw new Error('DEV_BY_ZERO');
					}
				}
			} catch (e) {
				console.log('Деление на 0, но ответ все равно будет!');
			} finally {
				return (this.firstN / div);
			}
		},

		mul: function () {
			var i,
				mul = 1;
			for(i = 0; i < arguments.length; i++) {
				mul = mul * arguments[i];
			}
			return (this.firstN * mul);
		}

	};

	return calc;
}

var myCalculator = calculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106

console.log(myCalculator.dif(10, 20)); //вернет 70

console.log(myCalculator.div(2, 2)); //вернет 25

console.log(myCalculator.mul(2, 2)); //вернет 400
