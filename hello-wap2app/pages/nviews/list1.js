(function() {
    //非5+引擎环境，退出
    if(navigator.userAgent.indexOf("Html5Plus") == -1) {
        return false;
    }

    //判断DOM是否加载完成，如果M站已封装了类似方法，可以直接使用，例如jQuery.ready()
    var readyRE = /complete|loaded|interactive/;
    if(readyRE.test(document.readyState)) {
        domReady();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            domReady();
        }, false);
    }

    function domReady() {
        var cacheId = "detail_cache"; //缓存的ID，NView模板会通过该ID读取缓存数据
        var container = document.querySelector("#list"); //列表容器,根据M站实现改造
        var eventType = "click"; //点击事件，根据M站实现更改，比如tap

        //容器添加点击事件监听
        container && container.addEventListener(eventType, function(e) {
            var target = e.target;
            for(; target && target !== container; target = target.parentNode) {
                if(target.classList && target.classList.contains("mui-media")) { //列表项
                    var data = {};
                    //获取图片路径
                    var imgElem = target.querySelector(".mui-media-object"); //获取当前列表项下图片对象
                    if(imgElem) {
                        data.cover = imgElem.getAttribute("src"); //获取图片资源路径
                    }
                    //获取标题
                    var titleElem = target.querySelector(".mui-ellipsis-2"); //获取当前列表项下的标题对象
                    if(titleElem) {
                        data.title = titleElem.innerHTML.trim(); //获取标题
                    }
                    //将当前数据存储到缓存中
                    plus.storage.setItem(cacheId, JSON.stringify(data));
                    return;
                }
            }
        });
    }
})();