window.onload = onLoad;

function onLoad() {
	updateTabs();
}

function openTab(e) {
	if(e.localName != 'li') return false;

	var item 	= e;
	var list 	= item.parentNode;
	var index 	= Array.prototype.indexOf.call(list.children, item);

	updateTabs(item);
}

function updateTabs(item) {
	if(!item) item = document.getElementById("tabmenu").children[0].children[0];
	if(!item) return false;

	var list 	= item.parentNode.children;
	var count 	= item.parentNode.childElementCount;
	var index 	= Array.prototype.indexOf.call(list, item);
	var pages 	= document.getElementById("pages").children[0].children;

	//update css classes
	for(var i = 0; i < count; i++) {
		if(!pages[i]) break;
		
		//reset
		pages[i].classList.remove('active');
		pages[i].classList.remove('before');
		pages[i].classList.remove('after');
		pages[i].classList.remove('left');
		pages[i].classList.remove('right');

		if(i == index) {
			pages[i].classList.add('active');
		} else {
			if(i < index) {
				pages[i].classList.add('before');
				if(i == index - 1) pages[i].classList.add('left');
			} else {
				pages[i].classList.add('after');
				if(i == index + 1) pages[i].classList.add('right');
			}
		}
	}
}