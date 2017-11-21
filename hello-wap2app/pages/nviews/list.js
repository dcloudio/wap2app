Page({
	options: {
		easyConfig: {
			cacheData:[{
				cacheDataId:"detail_cache",
				cacheEvent: {
					domSelector:"#list .mui-media",
					eventType: "click"
				},
				data: {
					title: function(container) {
						var dom = container.querySelector('.mui-ellipsis-2'),
							str = '';
						if(dom) {
							str = dom.innerText;
						}
						
						return str
					},
					cover: function(container) {
						var dom = container.querySelector('.mui-media-object'),
							str = '';
						if(dom && dom.src) {
							str = dom.src;
						}
						
						return str
					},
					author: function(container) {
						var dom = container.querySelector('.author'),
							str = '';
						if(dom) {
							str = dom.innerText;
						}
						
						return str
					},
					time: function(container) {
						var dom = container.querySelector('.time'),
							str = '';
						if(dom) {
							str = dom.innerText;
						}
						
						return str
					}
				}
			}]
		}
	}
})
