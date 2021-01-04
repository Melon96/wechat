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
                    peper:'0.85',
                    pe: '15.11',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.5',
                    pe: '15.31',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.76',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.1',
                    pe: '15.51',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.15',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.3',
                    pe: '15.91',
                    peBit: '74.49%',
                    pb: '1.51',
                    pbBit: '77.23%'
                }, {
                    industry: '农林牧渔',
                    peper:'0.6',
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
