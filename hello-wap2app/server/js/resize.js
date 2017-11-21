function setRootFontSize() {
	var width = document.documentElement.clientWidth,
		fontSize;
	if(width > 540) {
		width = 540;
	}
	fontSize = (width / 10);
	document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';
	window.wapParams = {
		rootFontSize: fontSize,
		clientWidth: width
	};
}
setRootFontSize();
window.addEventListener('resize', function() {
	setRootFontSize();
}, false);