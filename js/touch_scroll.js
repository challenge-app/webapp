var prev, next;
var prevObj, currObj, nextObj;
var diff, containerWidth;
var start_x, start_y, current_x, current_y;
var start_direction;

document.getElementById('pages').addEventListener('touchstart', onPageTouchStart, false);
document.getElementById('pages').addEventListener('touchmove', onPageTouchMove, false);
document.getElementById('pages').addEventListener('touchend', onPageTouchEnd, false);

if (window.navigator.msPointerEnabled) {
	document.getElementById('pages').addEventListener('MSPointerDown', onPageTouchStart, false);
	document.getElementById('pages').addEventListener('MSPointerMove', onPageTouchMove, false);
	document.getElementById('pages').addEventListener('MSPointerUp', onPageTouchEnd, false);
	document.getElementById('pages').addEventListener('pointerdown', onPageTouchStart, false);
	document.getElementById('pages').addEventListener('pointermove', onPageTouchMove, false);
	document.getElementById('pages').addEventListener('pointerup', onPageTouchEnd, false);
}

function onPageTouchStart(e) {
	start_x 	= e.screenX ? e.screenX / 2 : e.touches[0].screenX;
	start_y 	= e.screenY ? e.screenY / 2 : e.touches[0].screenY;

	prevObj = document.querySelector('article.left');
	currObj = document.querySelector('article.active');
	nextObj = document.querySelector('article.right');
	
	containerWidth 	= document.getElementById('pages').clientWidth;
	start_direction	= null;
}

function onPageTouchMove(e) {
	current_x 	= e.screenX ? e.screenX / 2 : e.touches[0].screenX;
	current_y 	= e.screenY ? e.screenY / 2 : e.touches[0].screenY;
	diff 		= current_x - start_x;

	if(!start_direction) {
		var pitagoras_x = Math.abs(current_x - start_x);
		var pitagoras_y = Math.abs(current_y - start_y);
		var tan 		= pitagoras_y / pitagoras_x;

		if(tan < Math.tan(Math.PI * 30 / 180)) {
			start_direction = 'horizontal';
		} else {
			start_direction = 'vertical';
		}
	}

	if(start_direction == 'horizontal') {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		if(prevObj) prevObj.classList.add('touching');
		if(currObj) currObj.classList.add('touching');
		if(nextObj) nextObj.classList.add('touching');

		if(prevObj) setTransformStyle(prevObj, 'translateX(' + (diff - containerWidth) + 'px)');
		if(currObj) setTransformStyle(currObj, 'translateX(' + (diff                 ) + 'px)');
		if(nextObj) setTransformStyle(nextObj, 'translateX(' + (diff + containerWidth) + 'px)');
	}
}

function onPageTouchEnd() {
	if(start_direction == 'horizontal') {
		if(prevObj) prevObj.classList.remove('touching');
		if(currObj) currObj.classList.remove('touching');
		if(nextObj) nextObj.classList.remove('touching');

		if(prevObj) setTransformStyle(prevObj, '');
		if(currObj) setTransformStyle(currObj, '');
		if(nextObj) setTransformStyle(nextObj, '');

		if(diff < -1 * (containerWidth / 3)) {
			if(nextObj) openTab(nextObj.getAttribute('rel'));
		} else if(diff > (containerWidth / 3)) {
			if(prevObj) openTab(prevObj.getAttribute('rel'));
		}
	}
}

function setTransformStyle(obj, str) {
	if(!(obj instanceof Object)) return false;

	obj.style.webkitTransform 	= str;
	obj.style.MozTransform 		= str;
	obj.style.msTransform 		= str;
	obj.style.OTransform 		= str;
	obj.style.transform 		= str;
}