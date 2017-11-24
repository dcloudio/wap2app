//  ios下监听document中的plusready而不是wap2app.plusReady，防止DOM节点不存在；
document.addEventListener('plusready', function() {
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
		});
	}
})

// 在安卓环境中，通常情况下需要html页面解析完成后才会让5+ API生效。所以在docment的ready事件触发之后wap2app.plusReady事件执行
wap2app.plusReady(function() {
	// Android下对视频播放全屏的横屏操作
	if(wap2app.os.android) {
		var self = plus.webview.currentWebview();
		self.setStyle({
			videoFullscreen: 'landscape' //横屏
		});
	}
})