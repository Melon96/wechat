define([
	'js/common/constant'
], function(
	Constant
) {

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var slice = Array.prototype.slice;

	// 核心对象定义
	var utils = {
		/*
		*验证手机号码正则表达式
		*@param param 手机号码
		*/
		checkPhone: function(param) {
			return /^1[34578]\d{9}$/.test(param);
		},
    //对象合并成字符串
    paramsConcat: function(opt){
        var params = '';
        for( var i in opt){
            params += i + '=' + opt[i] + '&';
        }
        return params.substring(0,params.length-1);
    },
		/**
		 * 查询当前页面URL参数
		 * @param param 字段名
		 * @returns 字段值
		 */
		getParameter: function(param) {
			var reg = new RegExp('[&,?]' + param + '=([^\\&#]*)', 'i');
			var valueArr = reg.exec(location.search);
			var value = valueArr ? valueArr[1] : '', decodeValue = value, i = 0;
			try {
				while (decodeValue !== decodeURIComponent(decodeValue)) {
					decodeValue = decodeURIComponent(decodeValue);
					if (++i > 10) {break;}
				}
			} catch(e) {
				return '';
			}
			if (decodeValue.match(/(?=<.*>)<\/.*>/) || i >= 11) {
				throw '系统异常，请稍后再试';
			} else {
				return value;
			}
	
		},
		/**
		 * 修改url的某个参数值
		 * @param url 需要处理的url
		 * @param arg 字段名
		 * @param arg_val 修改值
		 * @returns 修改后的url
		 */
		changeParameter: function(url, arg, arg_val) {
			var pattern = arg + '=([^&]*)';
			var replaceText = arg + '=' + arg_val;
			var newUrl = '';
			var urlArr = url.split('#');
			
			if(url.match(pattern)) {
				var tmp = '/(' + arg + '=)([^&]*)/gi';
				tmp = url.replace(eval(tmp), replaceText);
				return tmp;
			} else {
				if (url.indexOf('#') !== -1) {
					if (urlArr[0].indexOf('?') === -1) {
						newUrl = urlArr[0] + '?' + replaceText + '#' + urlArr[1];
					} else {
						newUrl = urlArr[0] + '&' + replaceText + '#' + urlArr[1];
					}
				} else if (url.indexOf('?') === -1) {
					newUrl = url + '?' + replaceText;
				} else {
					newUrl = url + '&' + replaceText;
				}
				// if (url.match(/#/)) {
				// 	newUrl = newUrl.replace(/(.*?)(#.*?)(\?.*?$)/,'$1$3$2');
				// 	// /invest/smart/stockSelection.html?id=166&type=1&from=native#info
				// }
				return newUrl;
			}
			return url + '\n' + arg + '\n' + arg_val;
		},
		/**
		 * 查询URL参数
		 * @param name
		 * @param [url]
		 * @returns {*}
		 */
		getQueryString: function(name, url) {
			var reg = new RegExp('[&,?]' + name + '=([^\\&#]*)', 'i');
			var value = reg.exec(url || location.href);
			return value ? value[1] : '';
		},
		/**
		 * 获取URL参数对象
		 * @param queryString
		 * @returns {{}}
		 */
		getQueryMap: function(queryString) {
			var paramObj = {},
				paramList,
				oneQueryMatch,
				regGlobal = /[\?\&][^\?\&]+=[^\?\&#]+/g,
				regOne = /[\?\&]([^=\?]+)=([^\?\&#]+)/;

			queryString = queryString || location.href;
			//取search里面的数据,屏蔽掉#aaa?type=123 这种类型
			queryString = queryString.split('#')[0];
			paramList = queryString.match(regGlobal);

			if(!paramList) {
				return paramObj;
			}

			for(var i = 0, len = paramList.length; i < len; i++) {
				oneQueryMatch = paramList[i].match(regOne);
				if(null === oneQueryMatch) {
					continue;
				}
				paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
			}

			return paramObj;
		},
		/**
		 * Cookie操作
		 */
		Cookie: function(key, value, options) {
			if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
				options = options || {};
				if(value === null || value === undefined) {
					options.expires = -1;
				}
				if(typeof options.expires === 'number') {
					var days = options.expires,
						t = options.expires = new Date();
					// expires以时间天为单位、接受小数
					t.setTime(t.getTime() + parseInt(days * 24 * 60 * 60 * 1000));
				}
				value = String(value);

				return(document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
			}
			options = value || {};
			var decode = options.raw ? function(s) {
				return s;
			} : decodeURIComponent;
			var pairs = document.cookie.split('; ');
			for(var i = 0; i < pairs.length; i++) {
				var pair = pairs[i],
					index = pair ? pair.indexOf('=') : -1,
					k, v;
				//cookie值中可能带有=号
				if(index != -1) {
					k = pair.substring(0, index);
					v = pair.substring(index + 1, pair ? pair.length : 0);

					if(decode(k) === key) {
						return decode(v || '');
					}
				}
			}
			return null;
		},
		dateFormat: function(d, fmt) {
			var date = null;
			if(!(d instanceof Date)) {
				date = new Date(parseInt(d));
			}
			var o = {
				"M+": date.getMonth() + 1, //月份
				"d+": date.getDate(), //日
				"h+": date.getHours(), //小时
				"m+": date.getMinutes(), //分
				"s+": date.getSeconds(), //秒
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度
				"S": date.getMilliseconds() //毫秒
			};
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		},
		/*
		 * 获取时间间隔，如多少分钟前，1个小时前， 2个小时前
		 * @params 
		 * startTime, endTime   格式： 2018-07-17 12:23:10
		 */
		getTimeInterval: function(startTime, endTime){
				//endTime = '2018-07-17 12:23:10';
				if (!startTime || !endTime) {
					return '';
				}
				startTime = Date.parse(startTime.replace(/-/g, '/'));
				endTime = Date.parse(endTime.replace(/-/g, '/'));
				
				var result = '', mss = startTime - endTime;
				var days = parseInt(mss / (1000 * 60 * 60 * 24)),
						hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
						minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)),
						seconds = parseInt((mss % (1000 * 60)) / 1000);

				if (days>=1) {
					result = days + '天前';
				} else if (hours>=1) {
					result = hours + '小时前';
				} else if (minutes>=1) {
					result = minutes + '分钟前';
				} else {
					result = seconds + '秒前';
				}
				console.log(result);
				return result;
		},
		//时间处理
    /**
     *传入时间戳,返回 月/日 时:分
     *    type = 1 ,返回 xx/xx/xx  时:分 , type = 2, 返回 xx月xx日, type = 3, 返回 时:分, type = 4, 返回 年－月－日
     */
		fTimeFormat: function(timeStamp, type) {
	        if (!timeStamp) {
	            return '';
	        }
	        timeStamp = Number(timeStamp);
	        var date = new Date(timeStamp);
	        var mon = date.getMonth() + 1;
	        var year = date.getFullYear();
	        mon = mon < 10 ? "0" + mon : mon;
	        var day = date.getDate();
	        day = day < 10 ? "0" + day : day;
	        var hour = date.getHours();
	        hour = hour < 10 ? "0" + hour : hour;
	        var min = date.getMinutes();
	        min = min < 10 ? "0" + min : min;

	        if (type == 1) {
	            return year + "/" + mon + "/" + day + " " + hour + ":" + min;
	        } else if (type == 2) {
	            return mon + "月" + day + "日";
	        } else if (type == 3) {
	            return hour + ":" + min;
	        } else if (type == 4) {
	            return year + "-" + mon + "-" + day;
	        } else if (type == 5) {
	            return year + "." + mon + "." + day;
	        } else if (type == 6) {
	            return mon + "月" + day + "日" + " " + hour + ":" + min;
	        } else if (type == 7){
	            return year + "." + mon + "." + day + "<br />" + hour + ":" + min;
	        }else if (type == 8){
				return year + "/" + mon + "/" + day;
			}else if (type == 9){
				return year + "年" + mon + "月" + day + "日";
			}else {
	            return mon + "/" + day + " " + hour + ":" + min;
	        }
	           
	     },
		//是否有属性
		has: function(obj, key) {
			return obj != null && hasOwnProperty.call(obj, key);
		},
		//遍历数据
		each: function(obj, iterator, context) {
			if(obj == null) return obj;
			var i, length = obj.length;
			if(length === +length) {
				for(var i = 0; i < length; i++) {
					iterator.call(context, obj[i], i, obj);
				}
			} else {
				for(var key in obj) {
					if(utils.has(obj, key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			}
			return obj;
		},
		// 将一个或多个对象的属性(包含原型链中的属性), 复制到obj对象, 如果存在同名属性则覆盖
		extend: function(obj) {
			// each循环参数中的一个或多个对象
			utils.each(slice.call(arguments, 1), function(source) {
				// 将对象中的全部属性复制或覆盖到obj对象
				for(var prop in source) {
					obj[prop] = source[prop];
				}
			});
			return obj;
		},
		// 简单的继承
		inherit: function(parent, protoProps, staticProps) {
			var child;

			if(protoProps && utils.has(protoProps, 'constructor')) {
				child = protoProps.constructor;
			} else {
				child = function() {
					return parent.apply(this, arguments);
				};
			}

			utils.extend(child, parent, staticProps);

			var Surrogate = function() {
				this.constructor = child;
			};
			Surrogate.prototype = parent.prototype;
			child.prototype = new Surrogate;

			if(protoProps) utils.extend(child.prototype, protoProps);

			child.__super__ = parent.prototype;

			return child;
		},
		asyncData: function (key, value, outTime, callback) {
			var dtd = $.Deferred();
			if (!C.Adapter.isNative) {// !app
				try {
					$.when(_data(key, value)).done(function(){
						// dtd.resolve(_data(key));
						dtd.resolve(arguments[0]);
					}).fail(function(){
						dtd.reject();
					});
				} catch(e) {
					dtd.reject(e);
				}
				return dtd;
			}
			if(key && value === undefined) {// 获取
				Adapter.getDataFromNative(key, function (data) {
					try {
						if (['101','102'].indexOf(data.errCode) > 0) {
							console.log('getDataFromNative is reject');
							dtd.reject();
						} else {
							console.log(JSON.stringify(data));
							var refKey = data && data.data;
							refKey = refKey ? JSON.parse(refKey) : [];
							dtd.resolve(refKey);
						}
					} catch (e) {
						console.log(e.message);
					}
				});
				return dtd;
			} else if(key && value === null) {// 删除
				try {
					Adapter.removeDataNative(key);
				} catch(e) {
					console.log(e.message);
				}
			} else {// 设置
				try {
					Adapter.setDataToNative(key, value, outTime);
				} catch(e) {
					console.log(e.message);
				}
			}
		},
		/**
		 * 本地数据操作
		 * getter C.Utils.data(C.Constant.DataKey.KEY);
		 * setter C.Utils.data(C.Constant.DataKey.KEY,"data");
		 * @param key
		 * @param value
		 */
		data: function(key, value) {
			return _data(key, value);
		},
		/**
		 * 会话级本地数据操作
		 */
		sessionData: function(key, value) {
			return _data(key, value, 'session');
		},
		/**
		 * 清除所有本地数据
		 */
		clearData: function() {
			try {
				localStorage.clear();
			} catch(e) {
				console.error(e.message);
			}
		},
		/**
		 * 清除所有会话级本地数据
		 */
		clearSessionData: function(notClearArray) {
			try {
				var i, key;
				if(!notClearArray) {
					sessionStorage.clear();
				} else {
					for(i = sessionStorage.length - 1; i >= 0; i--) {
						key = sessionStorage.key(i);
						if(notClearArray.indexOf(key) !== -1) {
							continue;
						}
						this.sessionData(key, null);
					}
				}
			} catch(e) {
				console.error(e.message);
			}

		},
		docCookies: {
			getItem: function(sKey) {
				return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
			},
			setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
				if(!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
					return false;
				}
				var sExpires = "";
				if(vEnd) {
					switch(vEnd.constructor) {
						case Number:
							sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
							break;
						case String:
							sExpires = "; expires=" + vEnd;
							break;
						case Date:
							sExpires = "; expires=" + vEnd.toUTCString();
							break;
					}
				}
				document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
				return true;
			},
			removeItem: function(sKey, sPath, sDomain) {
				if(!sKey || !this.hasItem(sKey)) {
					return false;
				}
				document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
				return true;
			},
			hasItem: function(sKey) {
				return(new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
			},
			keys: /* optional method: you can safely remove it! */ function() {
				var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
				for(var nIdx = 0; nIdx < aKeys.length; nIdx++) {
					aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
				}
				return aKeys;
			}
		},
		removeWechatParams: function(url) {
			url = url || '';
			var params = this.getQueryMap(url);
			var exceptparams = ['openid', 'subscribe', 'picurl', 'sex', 'signature', 'nonce', 'timestamp', 'headimgurl', 'nickname'];
			var i, len, key;
			var urlArr = url.split('?'),
				urlPath = urlArr[0],
				urlSearch = '',
				urlHash = (urlArr[1] || '').split('#')[1] || '';
			for (i = 0, len = exceptparams.length; i < len; i++) {
				delete params[exceptparams[i]];
			}
			for (key in params) {
				urlSearch += '&' + key + '=' + params[key];
			}
			urlSearch = urlSearch ? '?' + urlSearch.substring(1) : '';
			urlHash = urlHash ? '#' + urlHash : '';
			return urlPath + urlSearch + urlHash;
		},
		/** 
		 * @param {String} url 跳转的页面
     * @param {String} autoFunName 跳转后自动执行的方法
     * @param {Object} autoFunData 跳转后自动执行的方法的参数
		 */
		setPageAutoFun: function(url, autoFunName, autoFunData) {
			var tgAutoFunData;
			if (autoFunName) {
				tgAutoFunData = this.sessionData(Constant.DataKey.TG_AUTO_FUN) || {};
				tgAutoFunData[autoFunName] = $.extend({autoFunCreateTime: +new Date}, autoFunData);
				this.sessionData(Constant.DataKey.TG_AUTO_FUN, tgAutoFunData);
				url = this.changeParameter(url, 'autoFunName', autoFunName);
			}
			return url;
		},
		getImgUrl: function(url) {
			return Constant.FULL_INVEST_PATH + url;
		},
		/* options的默认值
         *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
         *  options.leading = true;
         * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
         *  options.trailing = true; 
         * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
         */
		throttle: function(func, wait, options) {
			var context, args, result;
            var timeout = null;
            var previous = 0;
            if (!options) options = {};
            var later = function() {
            	var now = new Date().getTime();
                previous = options.leading === false ? 0 : now;
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            };
            return function() {
                var now = new Date().getTime();
                if (!previous && options.leading === false) previous = now;
                // 计算剩余时间
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                // 当到达wait指定的时间间隔，则调用func函数
                // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
                if (remaining <= 0 || remaining > wait) {
                    // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    // options.trailing=true时，延时执行func函数
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
		},
		getPath: function(url) {
			var href = url || '';
      		var lastIndex = href.indexOf('?');
      		lastIndex = lastIndex === -1 ? href.length : lastIndex;
      		return href.substring(0, lastIndex);
		},
		rem2px: function(num) {
			var rootFontSize = parseFloat($('html').css('font-size')) || 1;
			num = Number(num);
			if (isNaN(num)) {
				num = 0;
			}
			return num * rootFontSize;
		},
		deepDecode: function(name) {
			if (name) {
				var decodeName = decodeURIComponent(name), decodeCount = 1;
		        while (decodeName !== decodeURIComponent(decodeName)) {
		            decodeCount++;
		            decodeName = decodeURIComponent(decodeName);
		            if (decodeCount > 100) {
		            	return false;
		            }
		        }
		        return decodeName;
			} else {
				return false;
			}
		    
		},
		getCdnUrl: function(url) {
			_app = _app || {}
			var cdnPrefix = _app.cdn || '';
			if (url.indexOf('http') !== 0) {
				url = cdnPrefix + url;
				url = utils.changeParameter(url, 'v', _app.ts);
				return url;
			} else {
				return url;
			}
		},
		//跳转股票行情
	    goStockDetail: function(opt){
	        if(Adapter.isEBank | Adapter.isHCZ || Adapter.is1QianBao) {
	            return;
	        }
	        if(Adapter.isNative) {
	            Adapter.showStockdetail(opt.code, type, opt.codeType);
	        } else {
	            //股票代码前两位 '00'、'30'代表 "SZ",'60'、'90'代表"SH"
	            var code = opt.code + '';
	            var type = opt.type || 0;
	            var stocks = ['60', '90']; 
	            var codeType = '';
	            if (!opt.codeType) {
	                codeType = 'SZ';
	                if (stocks.indexOf(code.substring(0, 2)) !== -1) {
	                    codeType = 'SH';
	                }
	            } else {
	            	codeType = opt.codeType;
	            }
	            location.href = Constant.STOCK_DETAIL + '?code='+ codeType+code;
	        }
	    }
	};

	/**
	 * 本地缓存
	 *
	 * 暫時用try﹣catch包裹起操作storage的操作塊，防止app禁用localstorage
	 * 或者safari在無痕模式下瀏覽等情況時導致未捕獲的異常
	 * @private
	 */
	function _data(key, value, type) {
		var storage = type == 'session' ? sessionStorage : localStorage;
		var getItemValue = function() {
			var data;
			try {
				data = storage.getItem(key);
			} catch(e) {
				console.log(e.message);
				return;
			}
			try {
				data = JSON.parse(data);
			} catch(e) {
				console.log(e.message);
			}
			return data;
		};
		if(key && value === undefined) {
			return getItemValue();
		} else if(key && value === null) {
			try {
				storage.removeItem(key);
			} catch(e) {
				console.log(e.message)
			}
		} else {
			try {
				storage.setItem(key, JSON.stringify(value));
			} catch(e) {
				console.log(e.message);
			}
		}
	};

	return utils;
});