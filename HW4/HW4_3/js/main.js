
ДЗ - 3
function deleteTextNodes(arg1) {
	var childs = arg1.childNodes;
	
	for (var i = 0; i<childs.length ; i++) {
		
		switch (childs[i].nodeType){
			case 3:
				childs[i].parentElement.removeChild(childs[i]);
				i -= 1;
				break;
			case 1:
				deleteTextNodes(childs[i]);
				break;
			default:
		}
		
		// if (childs[i].nodeType === 3) {
		// 	childs[i].parentElement.removeChild(childs[i]);
		// 	i -= 1;
		// } else if (childs[i].nodeType === 1) {
		// 	deleteTextNodes(childs[i]);
		// }
	}
}

var elem = document.getElementById("list");
deleteTextNodes(elem);


