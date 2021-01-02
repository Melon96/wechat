define([
	"zepto",
	"vue",
	//"VueHelper",
	"C",
	"ELEMENT"
],function($, Vue, C, ELEMENT){

	Vue.use(ELEMENT);
	
	var app = new Vue({
        el:'#app',
		data: function(){
            return {
                title: 'Hello World',
                tableData: [{
                    industry: '农林牧渔',
                    label:'',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'low',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'high',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'normal',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'low',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'low',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    label:'high',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }]
            }
		},
		created: function(){
			console.log('233');
        },
		mounted: function(){

		},
		methods: {
			formatIndus: function(row, column) {
		        return '<p>'+row.industry+'</p>';
		    }
		}
	})

});
