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
	var origin = Root.location && Root.location.origin || 'http://localhost:3000';

	var ENV = _app.env || 'PRD';


	if (origin.indexOf('stock.stg.pingan.com') !== -1 || origin.indexOf('m.stg.pingan.com') !== -1) {
		ENV = 'UAT';
	} else if (origin.indexOf('stockfat.stg.pingan.com:30074') !== -1 || origin.indexOf('m.fat.pingan.com:30074') !== -1) {
		ENV = 'FAT';
	} else if (origin === 'http://localhost:3000') {
		ENV = 'DEV';
	}

	var ORIGIN_DOMAIN = origin,
		STOCK_DOMAIN = 'https://stock.pingan.com',
		LICAI_DOMAIN = 'https://m.stock.pingan.com',
		PREFIX = '',
		LIVE_PREFIX = '',
		LOGIN_DOMAIN = 'https://login.stock.pingan.com',
		INVEST_PATH = _app.ctx || '/invest',
		LICAI_PATH,
		MOBILE_PATH = 'https://m.stock.pingan.com',
		commonLoginPage = '/login/index.html',
		//诊股域名
		ZHENGU_DOMAIN = 'https://ay.pingan.com',
		//牛交易行情数据域名
		NIU_TRADE_PATH = 'https://m.stock.pingan.com',

		LICAI_LC_PATH = 'https://m.stock.pingan.com',
		//上海域名
		WECHAT_MOBILE_PATH = 'https://m.stock.pingan.com',
		//WebSocket
		WS_DOMAIN = 'wss://m.stock.pingan.com',
		//是否开启CDN加速
		ENABLE_CDN = false;

	switch(ENV) {
		case 'DEV':
			INVEST_PATH = '/invest';
			//修改请求环境
			//PRD
			PREFIX = 'https://m.stock.pingan.com'; 
			LIVE_PREFIX = 'https://m.stock.pingan.com';
			
			//UAT
			STOCK_DOMAIN = 'https://stock.stg.pingan.com';
			LICAI_DOMAIN = 'https://m.stg.pingan.com';
			LICAI_LC_PATH = 'https://stocklc.stg.pingan.com';
			LOGIN_DOMAIN = 'https://login.stg.pingan.com';
			NIU_TRADE_PATH = 'https://stock.stg.pingan.com';
			MOBILE_PATH = 'https://m.stg.pingan.com';
			WECHAT_MOBILE_PATH = 'https://m.stg.pingan.com';
			PREFIX = 'https://m.stg.pingan.com';
			LIVE_PREFIX = 'https://m.stg.pingan.com';
			WS_DOMAIN = 'wss://m.stg.pingan.com';

			//FAT
			// STOCK_DOMAIN = 'http://m.fat.pingan.com:30074';
			// LOGIN_DOMAIN = 'http://login.fat.pingan.com:30074';
			// MOBILE_PATH = 'http://m.fat.pingan.com:30074';
			// WECHAT_MOBILE_PATH = 'http://m.fag.pingan.com:30074';
			// ZHENGU_DOMAIN = 'http://m.fat.pingan.com:30074';
			// NIU_TRADE_PATH = 'http://m.fat.pingan.com:30074';
			// PREFIX = 'http://m.fat.pingan.com:30074';
			// LIVE_PREFIX = 'http://m.fat.pingan.com:30074';
			// WS_DOMAIN = 'ws://10.25.175.118:30074';

			// //本地模拟数据
			// PREFIX = ''; 
			// LIVE_PREFIX = '';
			// STOCK_DOMAIN = 'http://m.fat.pingan.com:30074';
			// LOGIN_DOMAIN = 'http://login.fat.pingan.com:30074';
			// MOBILE_PATH = 'http://m.fat.pingan.com:30074';
			// WECHAT_MOBILE_PATH = 'http://m.fat.pingan.com:30074';
			// ZHENGU_DOMAIN = 'http://m.fat.pingan.com:30074';
			// NIU_TRADE_PATH = 'http://m.fat.pingan.com:30074';
			// WS_DOMAIN = 'ws://10.25.175.118:30074';
			break;
		case 'FAT':
			STOCK_DOMAIN = 'http://m.fat.pingan.com:30074';
			LICAI_DOMAIN = '';
			LICAI_LC_PATH = '';
			LOGIN_DOMAIN = 'http://m.fat.pingan.com:30074';
			MOBILE_PATH = 'http://m.fat.pingan.com:30074';
			WECHAT_MOBILE_PATH = 'http://m.fat.pingan.com:30074';
			ZHENGU_DOMAIN = 'http://m.fat.pingan.com:30074';
			NIU_TRADE_PATH = 'http://m.fat.pingan.com:30074';
			WS_DOMAIN = 'ws://10.25.175.118:30074';
			break;
		case 'UAT':
			STOCK_DOMAIN = 'https://stock.stg.pingan.com';
			LICAI_DOMAIN = 'https://stock.stg.pingan.com';
			LICAI_LC_PATH = 'https://stocklc.stg.pingan.com';
			LOGIN_DOMAIN = 'https://login.stg.pingan.com';
			MOBILE_PATH = 'https://m.stg.pingan.com';
			WECHAT_MOBILE_PATH = 'https://m.stg.pingan.com';
			ZHENGU_DOMAIN = 'https://stock.stg.pingan.com';
			NIU_TRADE_PATH = 'https://stock.stg.pingan.com';
			WS_DOMAIN = 'wss://m.stg.pingan.com';
			break;
	};

	LICAI_PATH = LICAI_DOMAIN + '/omm/phonex';
	LICAI_LC_PATH = LICAI_LC_PATH + '/omm/phonex';

	var CONSTANT = {
		ENV: ENV,

		SUCCESS_ERR_CODE: 0,
		SUCCESS_STATUS_CODE: 0,

		//ajax请求超时时间，单位：毫秒
		TIMEOUT: 30000,

		WECHAT_PARAMS_TIMEOUT: 2 * 60000,

		//tradesso错误代码
		TRADESSO_ERR_CODE_EXCEPTION: 999,
		TRADESSO_ERR_CODE_NOTLOGIN: 998,
		TRADESSO_ERR_CODE_PARAMERR: 997,

		ZUHE_TYPE: 0,
		STRATEGY_TYPE: 1,
		INFO_TYPE: 3,
		TOOLS_TYPE: 4,
		SCIENCE_TYPE: 5,
		
		NAV_ICON_CLASS: {
			1: 'i-home', //主页
			2: 'i-back', //返回
			3: 'i-search', //搜索
			4: 'i-notice', //提醒
			5: 'i-ok' //对号
		},

		SHOW_HEADER_MODULES: {
			shipan: false
		},

		reset: function(data) {
			for(var key in data) {
				this[key] = data[key];
			}
		},

		DataKey: {
			USER_INFO: 'TG_USER_INFO',
			TG_AUTO_WECHAT_LOGIN: 'TG_AUTO_WECHAT_LOGIN',
			TG_WECHAT_PARAMS: 'TG_WECHAT_PARAMS',
			TG_AUTO_FUN: 'TG_AUTO_FUN',
			TG_CHECK_INTERVAL: 'TG_CHECK_INTERVAL',
			TG_CHECK_APP_INTERVAL: 'TG_CHECK_APP_INTERVAL',
			//智能投顾首页数据
			TG_SMART_INDEX_DATA: 'TG_SMART_INDEX_DATA',
			// 我的订阅type类别
			SUB_MENUTYPE: 'SUB_MENUTYPE',
			// 我的订阅里消息设置type类别
        	MSG_SET_TYPE: 'MSG_SET_TYPE',
        	//直播间我的关注tab类别
        	LIVEROOM_TAB_MENETYPE: 'LIVEROOM_TAB_MENETYPE',
    		MSG_SET_TYPE: 'MSG_SET_TYPE',
	    	//直播间我的关注tab类别
	    	LIVEROOM_TAB_MENETYPE: 'LIVEROOM_TAB_MENETYPE',
	    	//组合详情收益曲线展示2
	    	ZUHE_USER_YIELD_DISPLAY:  'ZUHE_USER_YIELD_DISPLAY'
		},

		//证券域名
		STOCK_DOMAIN: STOCK_DOMAIN,
		MOBILE_PATH: MOBILE_PATH,
		//TGH5路径 
		INVEST_PATH: INVEST_PATH,
		FULL_INVEST_PATH: MOBILE_PATH + INVEST_PATH,
		LICAI_PATH: LICAI_PATH,
		LICAI_LC_PATH: LICAI_LC_PATH,
		//微信获取openid及加签串的地址
		WX_PROXY_PAGE: ORIGIN_DOMAIN + INVEST_PATH + '/login/wx_proxy.html',
		//微信我的账户地址
		WX_MYACCOUNT_PAGE: WECHAT_MOBILE_PATH + '/static/wechat/we/myaccount.html',
		//评论地址
		MY_READING: LICAI_PATH + '/comment_center.html',
		//统一登录地址
		COMMON_LOGIN_PAGE: LOGIN_DOMAIN + commonLoginPage,
		TOKEN_ID_COOKIE_KEY: 'ps_login_token_id',
		APPNAME_COOKIE_KEY: 'ps_login_app_name',
		LY_RELOGIN_TIP: '您当前登录的是融资融券账户，为了更好的使用实盘高手功能，请将App升级到最新版本或使用普通资金账户登录',
		//参数传值,打开页面target,打开app功能为schem
		OPEN_APP_PAGE: '/omm/mobile/phonex/campaign/deeplink/page.html',
		//参数:forceRefresh=true强制刷新登陆态,target=目标路径
		LICAI_AUTO_LOGIN_PAGE: LICAI_PATH + '/native_login.html',
		//tokenId , productID , code , byFollowInvestorID , stockName , tradeType
		GENTOU_PAGE: WECHAT_MOBILE_PATH + '/html/h5security/wechat/router/router.html',
		//跟投新版：mod=buy/sale, code
		GENTOU_PAGE_NEW: WECHAT_MOBILE_PATH + '/static/trade/trade/index.html',
		//股票行情H5版, 传参code=SZ000001
		STOCK_DETAIL: WECHAT_MOBILE_PATH + '/static/quote/quote/detail.html',
		//绑定微信号页面,参数 refer (回跳地址), referLevel 目标页面level（0：未绑定；1：已绑定微信但无资金账号； 2：已绑定微信且有资金账号）, subscribe, picurl, nonce, timestamp, headimgurl, nickname, signature, openid (wx_proxy.htm带回的参数)
		WECHAT_BIND_ACCOUNT_PAGE: WECHAT_MOBILE_PATH + '/static/thirdaccount/wechat/router.html',
		//问股域名
		WENGU_DOMAIN: STOCK_DOMAIN,
		//诊股域名
		ZHENGU_DOMAIN: ZHENGU_DOMAIN,
		//组合域名
		ZUHE_DOMAIN: MOBILE_PATH,
		//从第三方获取tokenId后校验地址,参数: channel渠道, target 目标页, autoFunName, autoFunData 成功后自动触发的回调名
		CHECK_TOKEN_ID_PAGE: ORIGIN_DOMAIN + INVEST_PATH + '/login/login.html',
		//灰度发布js地址
		TUFFY: WECHAT_MOBILE_PATH + '/static/common/js/tuffy/tuffy.js',
		//财富直播页面
		WEALTH_LIVE_SCHEME: 'anelicaiapp://stock.pingan.com/livelist',
		//风险测评,参数referUrl回跳地址
		RISK_SURVEY: WECHAT_MOBILE_PATH + '/static/sbp/survey/index.html?passingle=0',
		//牛交易行情数据域名
		NIU_TRADE_PATH: NIU_TRADE_PATH,
		//银行的js-sdk
		EBANK_JS_SDK: (ENV === 'PRD' ? 'https://bank-static.pingan.com.cn' : 'https://bank-static-stg.pingan.com.cn') + '/aladdin/cdn/aladdin/aladdin.ibank.min.js',
		//银行登陆地址, 参数: desturl 目标页
		EBANK_LOGIN_PAGE: WECHAT_MOBILE_PATH + '/static/pabank/entrance/router.html',
		//银行开户地址
		EBANK_OPEN_ACCOUNT: WECHAT_MOBILE_PATH + '/static/pabank/entrance/openaccount.html',
		//银行
		EBANK_AGGREGATION_PAGE: (ENV === 'PRD' ? 'https://bank-static.pingan.com.cn' : 'https://bank-static-stg.pingan.com.cn') + '/ibank/H5/security/index.html',
		//银证转账
		BANK_TRANSFER: WECHAT_MOBILE_PATH + '/static/sbp/banktransfer/index.html',
		//请求前缀
		PREFIX: PREFIX,
		//直播间请求前缀
		LIVE_PREFIX: LIVE_PREFIX,
		//直播间列表
		LIVE_HOME: WECHAT_MOBILE_PATH + '/static/valueservice/wealthlive/index.html',
		//视频直播预告页
		VIDEO_LIVE_PRE: WECHAT_MOBILE_PATH + '/static/valueservice/wealthlive/preLiveDetail.html',
		//app下载引导页
		VIDEO_LIVE_NOTNATIVE: 'https://stock.pingan.com/huodong/AnEXZ/index.html?url=https%3A%2F%2Fm.stock.pingan.com%2Fstatic%2Fvalueservice%2Fwealthlive%2Findex.html%3Findex%3D0&strongAcc=',
		RELOGIN_JS: LOGIN_DOMAIN + '/js/relogin.js',
		LC_CIRCLE_ADDRESS: LICAI_DOMAIN + '/omm/mobile/comm/index.html',
		WS_DOMAIN: WS_DOMAIN,
		//科学投顾频道页
		SCIENCE_INVEST: WECHAT_MOBILE_PATH + '/static/info/scienceinvest/index.html',
		//决策工具详情页
		TOOLS_DETAIL: WECHAT_MOBILE_PATH + '/static/valueservice/servicesale/detail.html?authCode=WEIPAN_LEVEL2&v=6.13',
		// 资金账号资料完善: 接适当性新二期多加参数isUseAppropriateCenter=1
		COMPLETE_INFO: WECHAT_MOBILE_PATH + '/static/account/updateinfo/complete_publish.html?agreementNo=tgProduct',
		//理财资料完善
		LICAI_COMPLETE_INFO: LICAI_DOMAIN + '/omm/mobile/map.html?target=perfect_info',
		//我的订阅页面组合tab
		MY_SUBSCRIBE_ZUHE: WECHAT_MOBILE_PATH + '/static/account/myservice/index.html?index=20&passingle=0',
		//我的订阅页面量化tab
		MY_SUBSCRIBE_STRATEGY: WECHAT_MOBILE_PATH + '/static/account/myservice/index.html?index=22&passingle=0',
		//我的订阅页面实盘tab
		MY_SUBSCRIBE_SHIPAN: WECHAT_MOBILE_PATH + '/static/account/myservice/index.html?index=21&passingle=0',
		//pdf viewer 地址
		PDF_VIEWER: MOBILE_PATH +'/omm/mobile/pdf_viewer/web/viewer.html',
		CDN_HOST: ENABLE_CDN ? _app.cdn : MOBILE_PATH,
		//增值服务货架主页
		PRODUCT_HOME: MOBILE_PATH + '/static/valueservice/servicesale/indexv3.html',
		//查看订单地址
		VIEW_ORDER_LIST: WECHAT_MOBILE_PATH + '/static/valueservice/productpurchase/orderList.html?datatab=vip'
	};
	return CONSTANT;
});