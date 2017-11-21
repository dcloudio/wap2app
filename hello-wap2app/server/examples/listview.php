<html>

	<head>
		<meta charset="UTF-8">
		<title>复用前页数据</title>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<link href="../css/mui.min.css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="../css/app.css"/>
		<style type="text/css">
			.mui-media {
				font-size: 14px;
			}
			
			.mui-table-view .mui-media-object {
				max-width: initial;
				width: 90px;
				height: 70px;
			}
			
			.meta-info {
				position: absolute;
				left: 115px;
				right: 15px;
				bottom: 8px;
				color: #8f8f94;
			}
			
			.meta-info .author,
			.meta-info .time {
				display: inline-block;
			}
			
			.meta-info .time {
				float: right;
			}
			
			.mui-table-view:before,
			.mui-table-view:after {
				height: 0;
			}
			
			.mui-content>.mui-table-view:first-child {
				margin-top: 1px;
			}
			
			.banner {
				padding: 10px 15px;
			}
			
			[v-cloak]{ display: none; }
			
			.mui-table-view-cell .mui-ellipsis-2{
				color: #000;
			}
			
		</style>
	</head>

	<body>

		<?php
			$agent = $_SERVER['HTTP_USER_AGENT'];
			if(strpos($agent,"Html5Plus") === false){//仅在非流应用环境下才显示导航栏
		?>
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">复用前页数据 - 示例新闻列表</h1>
			</header>
		<?php
			}
		?>


		<div class="mui-content">
			<p class="banner">
				这是NView演示界面，点击如下新闻列表，打开新闻详情webview时，会使用NView模板，预先渲染详情页顶部大图及新闻标题信息；
			</p>

			<!--列表信息流 开始-->
			<ul id="list" class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in items">
					<a :href="'detail.html?guid=' + item.guid" :data-guid="item.guid">
						<img class="mui-media-object mui-pull-left" :src="item.cover">
						<div class="mui-media-body">
							<div class="mui-ellipsis-2">{{item.title}}</div>
						</div>
						<div class="meta-info">
							<div class="author">{{item.author}}</div>
							<div class="time">{{item.time}}</div>
						</div>
					</a>
				</li>
			</ul>
			<!--列表信息流 结束-->
		</div>
		<script src="../js/app.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/vue.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			var news = new Vue({
				el: '#list',
				data: {
					items: [] //列表信息流数据
				}
			});

			function getNews() {

				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				}
				
				//请求列表信息流
				window.app.getJSON("/news/list", data, function(rsp) {
					if(rsp && rsp.length > 0) {
						lastId = rsp[0].id; //保存最新消息的id，方便下拉刷新时使用
						news.items = news.items.concat(convert(rsp));
					}
				});
			}

			getNews();


			/**
			 * 1、将服务端返回数据，转换成前端需要的格式
			 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
			 * 
			 * @param {Array} items 
			 */
			function convert(items) {
				var newItems = [];
				items.forEach(function(item) {
					newItems.push({
						guid: item.post_id,
						title: item.title,
						author: item.author_name,
						cover: item.cover,
						time: window.app.format(item.published_at)
					});
				});
				return newItems;
			}

		</script>
	</body>

</html>