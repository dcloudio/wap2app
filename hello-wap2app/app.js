App({
    options: {
        debug: true
    },
    /**
     * 当wap2app初始化完成时，会触发 onLaunch（全局只触发一次）
     * @param {Object} options
     */
    onLaunch: function(options) {
        console.log('launch[' + a + ']');
		
    },
    /**
     * 当wap2app启动，或从后台进入前台显示，会触发 onShow
     * @param {Object} options
     */
    onShow: function(options) {
        console.log('show[' + new Date() + ']');
    },
    /**
     * 当wap2app从前台进入后台，会触发 onHide
     */
    onHide: function() {
        console.log('hide[' + new Date() + ']');
    }
});