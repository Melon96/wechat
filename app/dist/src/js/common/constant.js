/**
 * 常量
 */
(function(Root, Constant) {
	var constant = Constant(Root);
	if(typeof module === 'object' && typeof exports === 'object') {
		module.exports = constant;
	} else if (typeof define === 'function' && define.amd) {
		define(function(require, exports, module) {
			return constant;
		});
	} else {
		Root.Constant = constant;
	}
})(this, function(Root) {
	
	var _app = Root._app || {};
	var origin = Root.location && Root.location.origin || 'http://localhost:8000';

	var ENV = _app.env || 'PRD';


	if (origin === 'http://localhost:8000') {
		ENV = 'DEV';
	}

	var DOMAIN = '',
		PATH = '',
		PREFIX = 'http://123.207.26.168:5000';

	switch(ENV) {
		case 'DEV':
			DOMAIN = 'http://123.207.26.168'
			PREFIX = 'http://123.207.26.168:5000';
		break;
	}

	var CONSTANT = {
		ENV: ENV,

		SUCCESS_ERR_CODE: 0,
		SUCCESS_STATUS_CODE: 0,

		//ajax请求超时时间，单位：毫秒
		TIMEOUT: 30000,
		DOMAIN: DOMAIN,
		PATH: PATH,
		PREFIX: PREFIX
	};
	return CONSTANT;
});