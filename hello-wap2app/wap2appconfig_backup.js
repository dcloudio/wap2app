!(function() {
	wap2app.init({
		debug: true,
		globalOptions: {
			matchHostnames: "hello.wap2app.liuyingyong.cn", //匹配页面的location.hostname,类型：String | Array(String) | RegExp | Function
			navigationbar: {
				backgroundColor: '#f7f7f7', //导航栏背景色
				titleColor: '#000000', //标题颜色
				titleSize: '17px', //标题字体大小
				borderColor: '#cccccc', //导航栏下边框颜色
				icons: {
					back: true, //左上角返回箭头
					home: false //右上角'首页'图标，默认不绘制
				}
			},
			//通用css注入，隐藏M站元素
			//1、顶部导航栏，使用原生导航栏
			//2、底部选项卡使用本地实现
			injectStyle: ".mui-bar.mui-bar-tab{display: none;}"
		},
		pages: [{
				webviewId: 'launch',
				url: 'http://hello.wap2app.liuyingyong.cn/index.html', //首页地址
				matchPathnames: ["/", "/index.html"],
				tabBar: { //选项卡
					list: [{
						matchPathnames: "/list.html"
					}, {
						matchPathnames: "/about.html"
					}]
				}
			},
			{
				webviewId: "client", //客户端注入css隐藏
				matchPathnames: /\/client-append/,
				injectStyle: ".mui-bar.mui-bar-nav,.download.bottom,.mui-bar.mui-bar-footer{display:none}"
			},
			{
				webviewId: "popup", //优化返回按键
				matchPathnames: /\/popup.html$/,
				injectStyle: ".mui-bar.mui-bar-nav{display:none;}.mui-bar-nav~.mui-content{padding-top:0;}"
			},
			{
				webviewId: 'news-list',
				matchPathnames: /\/listview/,
				pullToRefresh:true,
				cacheData: [{
					cacheDataId: 'detail_cache',
					cacheEvent: { //事件
						domSelector: '.mui-table-view-cell.mui-media a',
						eventType: 'click'
					},
					data: {
						title: function(container) {
							var el = container.querySelector(".mui-ellipsis-2");
							if(el) {
								return el.innerHTML.trim();
							}
						},
						cover:function(container) {
							var el = container.querySelector("img");
							if(el) {
								return el.getAttribute("src");
							}
						},
						author:function(container) {
							var el = container.querySelector(".author");
							if(el) {
								return el.innerHTML.trim();
							}
						},
						time:function(container) {
							var el = container.querySelector(".time");
							if(el) {
								return el.innerHTML.trim();
							}
						}
					},
				}]
			},
			{
				webviewId: "news-detail", //
				matchPathnames: /\/detail/,
				navigationbar:undefined,
				subNViews: 'detail.nview'
			}
		]
	});
})();