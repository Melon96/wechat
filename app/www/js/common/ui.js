define(['zepto', 'js/common/constant', 'js/common/utils'], function($, Constant, Utils) {

    var ui = {};

    /*
        弹出框
        C.UI.dialog({
            title:"title",
            content:"content",
            ok:function(){
                // ok callback
            },
            cancel:function(){
                // cancel callback    not required
            }
        })
    */
    ui.dialog = function(opt) {
        
    };

    /**
     * 提示框
     * @param {String} message 提示内容
     * @param {Number} timeout 显示时间, 默认显示3秒
     * @param {String} type 提示类型
     * 示例: ui.tip('内容');
     *       ui.tip('内容', 4000);
     */
    ui.tip = (function() {
        var _tip = {};
        var _color = {
            "success": "#dff0d8",
            "success-t": "#25421A",
            "info": "#d9edf7",
            "info-t": "#253A44",
            "error": "#f2dede",
            "error-t": "#4F3232",
            "warning": "#fcf8e3",
            "warning-t": "#474126"
        };
        return function(message, timeout, type) {
            type = type || 'info';
            timeout = timeout || 3000;
            if (!message) {
                return;
            }
            var line = Math.ceil(message.length / 20) * 0.5 + 0.72;

            var div = document.getElementById("_tips");
            var hide = function() {
                div.style.webkitTransform = "translate3d(0px, -50%, 0px)";
                div.style.opacity = "0";
                div.style.zIndex = "-2";
            };
            if (!div) {
                var el = document.createElement("div");
                el.innerHTML = '<div id="_tips" style="position:fixed;left:0;width:100%;top:50%;line-height:0.45rem;font-size:.28rem;color:#fff;z-index:9999;margin-top:-1rem;text-align:center;"><div style="text-align:center;display:inline-block;background:rgba(0,0,0,.75);padding:0.26rem 0.3rem;border-radius: 0.1rem;min-width: 2.5rem; margin-left: 0.2rem; margin-right: 0.2rem;"><span id="_tips_text"></span></div></div>';
                document.body.appendChild(el);
                div = document.getElementById("_tips");
                div.onclick = function() {
                    setTimeout(function() {
                        hide();
                    }, 10);
                    if (_tip.timmer) {
                        clearTimeout(_tip.timmer);
                        _tip.timmer = null;
                    }
                };
            }
            text = document.getElementById("_tips_text");
            // div.style.backgroundColor = _color[type] || _color["info"];
            // div.style.color = _color[type + '-t'] || _color["info-t"];
            text.innerHTML = message;
            if (_tip.timmer) {
                clearTimeout(_tip.timmer);
                _tip.timmer = null;
            }
            div.style.webkitTransition = "none";
            div.style.opacity = "0";
            div.style.webkitTransform = "translate3d(0px, 50%, 0px)";
            setTimeout(function() {
                div.style.opacity = "1";
                div.style.webkitTransform = "translate3d(0px, 0%, 0px)";
                div.style.webkitTransition = "all 0.2s";
                div.style.webkitTransitionTimingFunction = "cubic-bezier(.17,.67,.69,1.23)";
                div.style.zIndex = "9999";
            }, 300);
            _tip.timmer = setTimeout(function() {
                hide();
            }, timeout);
        };
    })();

    /**
     * url 处理函数
     * @param {Object|String} opt 参数 或 url 跳转的url
     *         opt: {
     *                  url {String} 跳转地址
     *                  data {Object} 参数
     *                  disableEncodeURI {Boolean} 是否禁止encode data内的值
     *                  singlePage {Boolean} 单页模式
     *                  skipSinglePageRouter 跳过使用单页模式路由 ,
     *                  notNeedResetTitle  不需要重置标题
     *              }
     */
    ui.handleUrl = function(opt) {
        if (typeof opt === 'string') {
            opt = {
                url: opt
            };
        }
        var data = opt.data || {},
            hash = opt.url.split("#")[1],
            url = opt.url.split("#")[0].split("?")[0],
            urlData = Utils.getQueryMap(opt.url),
            param = [],
            key;

        if (!opt.disableEncodeURI) {
            for (key in data) {
                if (data[key]) {
                    data[key] = encodeURIComponent(data[key]);
                }
            }
        }
        if (opt.singlePage && !opt.skipSinglePageRouter) {
            data['SPRouter'] = true;
        }

        $.extend(urlData, data);
        for (key in urlData) {
            param.push(key + '=' + urlData[key]);
        }
        url += param.length > 0 ? '?' + param.join("&") : '';
        if (hash) {
            url += "#" + hash;
        }

        if (opt.singlePage) {
            return '#' + url;
        } else {
            
            return url;
        }
    };

    /**
     * 跳转页面
     * @param {String|Object} 跳转参数
     * 如果为String 则当成跳转地址url处理
     * 如果为Object 结构如下:
     *          {
     *              @param {String} url 跳转地址
     *              @param {Object} data url带的参数
     *              @param {Boolean} disableEncodeURI 禁止encode
     *              @param {Boolean} singlePage 单页模式
     *              @param {Boolean} skipSinglePageRouter 跳过使用单页模式路由 
     *          }
     */
    ui.forward = function(opt) {
        if (typeof opt === 'string') {
            opt = {
                url: opt
            };
        }
        var url = ui.handleUrl(opt);
        if(!url) return;
        window.location.href = url;
    };

    /**
     * 跳转页面
     * @param {String|Object} 跳转参数
     * 如果为String 则当成跳转地址url处理
     * 如果为Object 结构如下:
     *          {
     *              @param {String} url 跳转地址
     *              @param {Object} data url带的参数
     *              @param {Boolean} disableEncodeURI 禁止encode
     *              @param {Boolean} singlePage 单页模式
     *              @param {Boolean} skipSinglePageRouter 跳过使用单页模式路由 
     *          }
     */
    ui.replace = function(opt) {
        var url = ui.handleUrl(opt);
        if (url) {
            //ios不能跳转
            if (!Adapter.isIos && history.replaceState && (!/(http:|https:)/g.test(url) || url.indexOf(location.origin) != -1)) {
                history.replaceState(null, document.title, url);
                history.go(0);
                if (navigator.userAgent.match(/QQBrowser/ig)) { //处理qq浏览器不会刷新的bug
                    location.reload()
                }
            } else {
                window.location.href = url;
            }
        }
    };

    ui.reload = function (url, key) {
        if (Adapter.weixin) {
            url = url || location.href;
            key = key || '_t';
            var timestamp = +new Date();
            location.href = Utils.changeParameter(url, key, timestamp);
        } else {
            location.reload(url);
        }
    }

    /**
     * 显示正在加载转圈以及遮罩层
     */
    ui.showLoading = function() {
        var $loading = $("#common-loading");
        if ($loading.length == 0) {
            $loading = $('<div id="common-loading" class="fxng-common-loading"><div class="loading-box"><span class="icon"></span><p class="tip">加载中...</p></div></div>');
            $loading.appendTo($("body"));
        } else {
            $loading.removeClass('hide');
        }
    };
    /**
     * 隐藏正在加载转圈以及遮罩层
     */
    ui.hideLoading = function() {
        $("#common-loading").addClass('hide');
    };

    return ui;
})
