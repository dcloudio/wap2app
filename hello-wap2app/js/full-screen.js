//   监听plusready而不是window.plus，防止DOM节点不存在；
document.addEventListener('plusready', function() {
//	alert('document plusReady')
	// iOS下对视频播放全屏的横屏操作
	if(wap2app.os.ios) {
		var videoElem = document.querySelector('video'); //video元素
		// video元素开始全屏
		videoElem.addEventListener('webkitbeginfullscreen', function() {
			plus.screen.lockOrientation('landscape');
		});
		// video元素全屏结束
		videoElem.addEventListener('webkitendfullscreen', function() {
			plus.screen.lockOrientation('portrait');
			console.log('video元素全屏结束');
		});
	}
	
});

wap2app.plusReady(function(){
	// Android下对视频播放全屏的横屏操作
	if(wap2app.os.android) {
		var self = plus.webview.currentWebview();
		self.setStyle({
			videoFullscreen: 'landscape' //横屏
		});
	}
})
