(function(){
	var _appver = window._appver = {
		v:new Date().getTime()
	}
	if (typeof define === 'function' && define.amd) {
		define(function(require, exports, module) {
			return _appver;
		});
	}
})();