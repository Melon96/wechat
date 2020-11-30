define([
	"zepto",
	"vue",
	//"VueHelper",
	"C",
	"ELEMENT"
],function($, Vue, C, ELEMENT){

	Vue.use(ELEMENT);
	
	var app = new Vue({
		el: '#app',
		data: {
			title: 'Hello World',
			tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1517 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1519 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }]
		},
		created: function(){
			console.log('233');
		},
		mounted: function(){

		},
		methods: {
			formatter: function(row, column) {
		        return row.address;
		    }
		}
	});

});
