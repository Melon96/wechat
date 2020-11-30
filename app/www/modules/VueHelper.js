define(["zepto", "vue", "C"], function($, Vue, C) {

    var VueHelper = {
        getTemplate: function(t, n) {
            var e;
            window._TEMPLATE = window._TEMPLATE || {},
            (e = window._TEMPLATE[t]) ? setTimeout(function() {
                n(e)
            }, 0) : o.ajax({
                url: t,
                data: {
                    v: _app.version
                },
                type: "get",
                dataType: "text",
                beforeSend: function() {},
                complete: function() {},
                success: function(e) {
                    window._TEMPLATE[t] = e,
                    n(e)
                }
            })
        },
        bootstrap: function(e, t) {
            e.$mount(t)
        }
    }

    return VueHelper;
    
});
