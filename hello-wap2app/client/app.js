/**
 * app.js书写请参考文档【http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/12806】
 */

App({
	options: {
		debug: false // 是否开启调试模式，默认为false
	},
	/**
	 * 生命周期函数，当wap2app初始化完成时，会触发 onLaunch（全局只触发一次）
	 */
	onLaunch: function() {
		console.log('launch');
		/************升级检测代码开始********** */
		var ua = navigator.userAgent;
		//Html5Plus环境，但不是流应用环境
		if(ua.indexOf('Html5Plus') > -1 && ua.indexOf('StreamApp') == -1) {
			var server = "http://www.dcloud.io/check/update"; //检查更新地址
			var req = { //升级检测数据
				"appid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei
			};
			//注释部分是wap2app封装的post请求。示例使用get请求
			wap2app.ajax.get(server, req, function(rsp) {
				if(rsp && rsp.status) {
					//需要更新，提示用户
					plus.nativeUI.confirm(rsp.note, function(event) {
						if(0 == event.index) { //用户点击了“立即更新”按钮
							plus.runtime.openURL(rsp.url);
						}
					}, rsp.title, ["立即更新", "取　　消"]);
				}
			});
		}
		/************升级检测代码结束********** */

		/******推送消息监听代码开始******/
		//个推消息-监听click事件
		plus.push.addEventListener("click", function(msg) {
			console.log("You clicked: " + msg.title); //推送消息标题
			console.log("You clicked: " + msg.content); //推送消息内容
			
			//根据payload传递过来的数据，打开一个详情
			if(msg.payload) {
				if(typeof(msg.payload) == "string") {
					msg.payload = JSON.parse(msg.payload);
				}else if(typeof(msg.payload) == "object") {
					//payload是一个json对象，可以传递业务数据，开发者可以根据实际需求自定义参数
					//本示例在payload中传入新闻id，wap2app接收到推送后，直接打开新闻详情
					if(msg.payload.id) {
						var detailId = msg.payload.id;
						//wap2app.open(url)可以直接打开对应的webview
						//这里是示例，实际项目中开发者需根据M站的url拼接页面地址
						wap2app.open('http://hello.wap2app.dcloud.io/examples/detail.html?guid=' + detailId);
					}
				}
			}
		}, false);

		//个推消息-receive事件监听
		plus.push.addEventListener("receive", function(msg) {
			alert("receive: " + msg.content);
		}, false);
		/******推送消息监听代码结束******/
	},
	/**
	 * 生命周期函数，当wap2app启动，或从后台进入前台显示，会触发 onShow
	 */
	onShow: function() {
		console.log('show');
	},
	/**
	 * 生命周期函数，当wap2app从前台进入后台，会触发 onHide
	 */
	onHide: function() {
		console.log('hide');
	}
});

/**
 *  注册页面 为相应webview 提供的基于 JavaScript 的可编程增强方案
 */
Page('__W2A__hello.wap2app.dcloud.io', { //首页扩展配置
	onShow: function() {
		
	},
	onClose: function() {

	}
});

Page('pullToRefresh-custorm', { // 自定义下拉刷新
	onShow: function() {
		var ws = plus.webview.getWebviewById('pullToRefresh-custorm');
		ws.setPullToRefresh({
			support: true,
			style: 'circle',
			height: '50px',
			range: '200px'
		}, function() {
			ws.evalJS('addData(5)'); // 自定义下拉刷新逻辑
			setTimeout(function() { // 延时处理为示例效果需要，开发者可自行定义
				plus.nativeUI.toast('自定义下拉刷新结束了');
				// 结束后关闭下拉刷新控件，这一步是必要的
				ws.endPullToRefresh();
			}, 200);

		})
	},
	onClose: function() {

	}
});

