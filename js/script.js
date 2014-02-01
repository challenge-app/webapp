window.onload = onLoad;

function onLoad() {
	openTab(); //same as openTab('home') because 'home' is the first child
}

function onClickTabItem(item) {
	if(item && item.getAttribute('rel')) openTab(item.getAttribute('rel'));
}

function openTab(rel) {
	var query 	= rel ? "#tabmenu [rel="+rel+"]" : "#tabmenu ul li:first-child";
	var item 	= document.querySelector(query);
	if(!item) return false;

	var list 	= item.parentNode.children;
	var count 	= item.parentNode.childElementCount;
	var index 	= Array.prototype.indexOf.call(list, item);
	var pages 	= document.getElementById("pages").children;

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