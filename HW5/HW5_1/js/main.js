(function() {

	var triggers = document.getElementsByClassName ("accordeon_trigger");
		texts = document.getElementsByClassName ("accordeon_trigger-text");
	
	var showInner = function () {
		var inner = this.nextElementSibling;
			text = this.firstElementChild;
		this.classList.toggle('orangecolor');
		text.classList.toggle('whytetype');
		if(inner !== null) {
			inner.classList.toggle('active');
		}
		
	};

	for (var j = 1, leng = triggers.length; j < leng ; j++){
		triggers[j].classList.add('whiteback');
		texts[j].classList.add('graytype');
		j=j+1;
	}


	for (var i = 0, len = triggers.length; i < len ; i++) {
		triggers[i].addEventListener('click', showInner, false);
	};

})(); 

