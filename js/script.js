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

var start,
		last,
		current,
		diff,
		prev,
		next,
		prevObj,
		nextObj,
		docWidth = window.innerWidth;

document.addEventListener("touchstart", function(evt)
{
	start = last = current = evt.touches[0].screenX;
	document.querySelector('article.active').classList.remove('ease-it');

	next = document.querySelector('article.active').getAttribute('data-next');
	prev = document.querySelector('article.active').getAttribute('data-prev');

	nextObj = document.querySelector('article[rel="'+next+'"]');
	prevObj = document.querySelector('article[rel="'+prev+'"]');
	
	nextObj.classList.remove('ease-it');
}, false);

document.addEventListener("touchmove", function(evt)
{
	evt.preventDefault();

	last = current;
	current = evt.touches[0].screenX;

	diff = current - start;

	var aux = (docWidth+diff);

	document.querySelector('article.active').style.left = diff+"px";
	//prevObj.style.left = diff+"px";
	nextObj.style.left = aux+"px";

}, false);

document.addEventListener("touchend", function()
{

	document.querySelector('article.active').classList.add('ease-it');
	document.querySelector('article.active').style.left = "0px";

	if(diff < -200 && next != "")
	{
		document.querySelector('article.active').style.left = "";
		updateTabs(document.querySelector('li[rel="'+next+'"]'));
	}
	else if(diff > 200 && prev != "")
	{
		document.querySelector('article.active').style.left = "";
		updateTabs(document.querySelector('li[rel="'+prev+'"]'));
	}
}, false);