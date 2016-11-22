//ДЗ - 2
function deleteTextNodes(arg1) {
	var childs = arg1.childNodes;
	
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].nodeType === 3) {
			childs[i].parentElement.removeChild(childs[i]);
		}
	}
}

var elem = document.getElementById("list");
deleteTextNodes(elem);






























