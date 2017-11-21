var app = {
	getJSON: function(url, params, callback) { //简单实现getJSON
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					callback(JSON.parse(xhr.responseText));
				} else {
					callback(false);
				}
			}
		};
		var paramsArray = [];
		for(var key in params) {
			paramsArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		xhr.open("GET", url + '?' + paramsArray.join('&'));
		xhr.send();
	},
	each: function(elements, callback) {
		for(var key in elements) {
			if(callback.call(elements[key], key, elements[key]) === false) return elements;
		}
	},
	decode: function(str) {
		var decodeRegexp = /\+/g;
		return decodeURIComponent(str.replace(decodeRegexp, " "));
	},
	parseParams: function(queryString) {
		var params = {};
		var paramRegexp = /([^&=]+)=?([^&]*)/g;
		queryString = queryString && (queryString.indexOf('?') >= 0 ? queryString.substring(queryString.indexOf("?") + 1) : queryString);
		if(queryString) {
			var e;
			while(e = paramRegexp.exec(queryString)) {
				params[this.decode(e[1])] = this.decode(e[2]);
			}
		}
		return params;
	},
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';

		this.each(this.UNITS, function(unit, value) {
			if(milliseconds >= value) {
				humanize = Math.floor(milliseconds / value) + unit + '前';
				return false;
			}
			return true;
		});
		return humanize || '刚刚';
	},
	format: function(dateStr) {//格式化时间的辅助类，将一个时间转换成x小时前、y天前等
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if(diff < this.UNITS['天']) {
			return this.humanize(diff);
		}

		var _format = function(number) {
			return(number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
}

window.app = app;

(function() {
	var backElem = document.querySelector(".mui-action-back");
	backElem && backElem.addEventListener("click", function() {
		history.back();
	});
})();