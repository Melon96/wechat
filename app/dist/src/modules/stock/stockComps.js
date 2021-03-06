define([
	"zepto",
	"vue",
	"C",
	"ELEMENT"
],function($, Vue, C, ELEMENT){

	Vue.use(ELEMENT);
	
	var app = new Vue({
		el: '#app',
		data: {
			updateTime: '',
			list: [
				/*{"Valuation":"1","dyr":"0.0207","id":1,"name":"上证指数","pb":"1.5","pbper":"0.3761","pe":"15.69","peper":"0.8877","rating":"5","roe":"0.0892"},
				{"Valuation":"2","dyr":"0.0096","id":2,"name":"深证成指","pb":"3.56","pbper":"0.9069","pe":"31.13","peper":"0.734","rating":"2","roe":"0.1116"},
				{"Valuation":"3","dyr":"0.0254","id":3,"name":"上证50","pb":"1.49","pbper":"0.6689","pe":"13.76","peper":"0.666","rating":"2","roe":"0.1003"},
				{"Valuation":"4","dyr":"0.004","id":4,"name":"创业板指","pb":"7.92","pbper":"0.9215","pe":"61.11","peper":"0.456","rating":"2","roe":"0.1335"},
				{"Valuation":"5","dyr":"0.02","id":5,"name":"沪深300","pb":"1.7","pbper":"0.6941","pe":"15.56","peper":"0.2344","rating":"2","roe":"0.1007"}
				*/],
			loading: true
		},
		created: function(){
			this.updateTime = C.Utils.fTimeFormat(+ new Date(), 4)
			this.getList();
		},
		mounted: function(){

		},
		methods: {
			getList: function() {
				var self = this;
				C.FetchApi.fAjax({
					type: 'POST',
					url: C.Api.GET_STOCK_COMPS_LIST
				}).done(function(data){
					self.list = self.parseData(data.list || []);
				});
			},
			parseData: function(list){
				var temp = [], item = {};
				var grades = ['低','偏低', '正常', '偏高', '高'], classNames = ['moreLower','lower','normal','hight','moreHight'];
				for(var i=0; i<list.length; i++) {
					item = list[i];
					var peper = item.peper;
					item.peper = this.parseNumber(item.peper);
					item.pbper = this.parseNumber(item.pbper);
					item.roe = this.parseNumber(item.roe);
					item.dyr = this.parseNumber(item.dyr);
					item.className = item.Valuation?classNames[Number(item.Valuation)-1]:'';
					item.valuationState = item.Valuation?grades[Number(item.Valuation)-1]:'';
					item.rating = item.rating?Number(item.rating):0;
					temp.push(item);
				}
				return temp;
			},
			parseNumber: function(number){
				if(number == null || number == '') {
					return '--';
				} else {
					return (number * 100).toFixed(2);
				}
			}
		}
	});

});
