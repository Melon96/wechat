/**
 * 请求相关方法
 */
define([
    'zepto',
    'js/common/constant',
    'js/common/utils',
    'js/common/ui',
], function($, Constant, Utils, UI) {


    var _tokenData = {
        appName: "AYLCAPP",
        tokenId: "",
        cltplt: "h5", //applt可选clt, web, aph, apd, iph, ipd, editor, h5
        cltver: "1.0",
        body: {} //接口入参
    };

    var ajaxRequestCount = 0;

    $.ajaxSettings.cache = false;

    return {
        prefix: Constant.PREFIX,
        //后台请求来源参数  0 h5, 1 app, 2 微信
        source: '',
        ajax: function(opt, noLoading) {
            // if (Constant.ENV === 'DEV') {
            //   opt.url = opt.url.indexOf('/') === 0 ? 'https://stock.stg.pingan.com' + opt.url : opt.url;
            // }
            var self = this;
            return $.ajax({
                url: opt.url,
                data: opt.data || {},
                type: opt.type || 'GET',
                contentType: opt.contentType || 'application/json;charset=UTF-8',
                beforeSend: function(xhr, settings) {
                    if (typeof(opt.beforeSend) === 'function') {
                        opt.beforeSend(xhr, settings);
                    } else {
                        self.showLoading(noLoading);
                    }
                },
                success: function(response) {
                    if (typeof(opt.success) === 'function') {
                        opt.success(response);
                    }
                },
                error: function(xhr, errortype, error) {
                    if (typeof(opt.error) === 'function') {
                        opt.error(xhr, errortype, error);
                    }
                },
                complete: function(xhr, status) {
                    self.hideLoading(noLoading);
                    if (typeof(opt.complete) === 'function') {
                        opt.complete(xhr, status);
                    }
                }
            });
        },
        showLoading: function(noLoading) {
            if (!noLoading) {
                if (ajaxRequestCount++ == 0) {
                    UI.showLoading();
                }
            }
        },
        hideLoading: function(noLoading) {
            if (!noLoading) {
                if (ajaxRequestCount <= 0 || --ajaxRequestCount == 0) {
                    UI.hideLoading();
                }
            }
        }
    };
    

});