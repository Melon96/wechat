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
        appName: "weixin",
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
                        //self.showLoading(noLoading);
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
                    //self.hideLoading(noLoading);
                    if (typeof(opt.complete) === 'function') {
                        opt.complete(xhr, status);
                    }
                }
            });
        },

        fAjax: function(ajaxOpt, extrOpt){
            var self = this,
                dtd = $.Deferred();
                ajaxOpt = ajaxOpt || {};
                extrOpt = extrOpt || {};
            $.ajax({
                url: ajaxOpt.url,
                type: ajaxOpt.type || 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: ajaxOpt.data || {},
                beforeSend: function(xhr, settings) {
                    ajaxOpt.beforeSend && ajaxOpt.beforeSend(xhr, settings);
                    //self.showLoading(extrOpt.noLoading);
                },
                complete: ajaxOpt.complete
                }).done(function(res, status, xhr) {
                    var url = ajaxOpt.url;
                    if (res.err === 0 ) {
                        ajaxOpt.success && ajaxOpt.success(res.data || {}, res);
                        dtd.resolve(res.data || {}, res);
                    } else {
                        UI.tip('系统繁忙，请稍后再试！');
                        dtd.reject(xhr.response, xhr, status);
                    }
                }).fail(function(xhr, errorType, error) {
                    if (!ajaxOpt.error || !ajaxOpt.error(xhr, errorType, error)) {
                        UI.tip('系统繁忙，请稍后再试！');
                    }
                    dtd.reject(xhr, errorType, error);
                }).always(function() {
                    //self.hideLoading(extrOpt.noLoading);
                });
            return dtd;
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