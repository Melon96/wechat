var express = require('express');
var router = express.Router();

//卡片顺序
router.post('/getUserCardList', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
	    status:1,
	    data:{
	    	cardList: [0, 1, 2, 5, 6, 7, 8],
	    	isSigned: 0
	    }
	});

});
//获取签约组合日报
router.post('/getDailyReport', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		"status": 1,
		"data": [
			{
				"productNo": "5263",
				"productName": "技术达人",
				"dailyEarnings": "10.033241",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "31253",
				"bigRaiseStockName": "盐湖股份",
				"bigRaiseNumber": "316.3223"
			},
			{
				"productNo": "5262",
				"productName": "技术达人",
				"dailyEarnings": "20.0343",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "00001",
				"bigRaiseStockName": "中国银行",
				"bigRaiseNumber": "104.32325"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"dailyEarnings": "10.033241",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "31253",
				"bigRaiseStockName": "盐湖股份",
				"bigRaiseNumber": "316.3223"
			},
			{
				"productNo": "5262",
				"productName": "技术达人",
				"dailyEarnings": "20.0343",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "00001",
				"bigRaiseStockName": "中国银行",
				"bigRaiseNumber": "104.32325"
			}
		]
	});

});
//获取签约组合周报
router.post('/getWeeklyReport', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		"status": 1,
		"data": [
			{
				"productNo": "5263",
				"productName": "技术达人",
				"dailyEarnings": "10.03",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "31253",
				"bigRaiseStockName": "盐湖股份",
				"bigRaiseNumber": "316.32"
			},
			{
				"productNo": "5262",
				"productName": "技术达人",
				"dailyEarnings": "10.03",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "00001",
				"bigRaiseStockName": "中国银行",
				"bigRaiseNumber": "124.32"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"dailyEarnings": "10.03",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "31253",
				"bigRaiseStockName": "盐湖股份",
				"bigRaiseNumber": "316.32"
			},
			{
				"productNo": "5262",
				"productName": "技术达人",
				"dailyEarnings": "10.03",
				"weeklyEarnings": "12.05",
				"changePositionTimes": "4",
				"bigRaiseStockCode": "00001",
				"bigRaiseStockName": "中国银行",
				"bigRaiseNumber": "124.32"
			}
		]
	});

});
//调仓动态
router.post('/getTodayTradeRecord', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		"status": 1,
		"data": [
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"1",
				"market_id": "SH",
				"trade_type": "0",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": ""
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"1",
				"market_id": "SH",
				"trade_type": "1",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": "昨天"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"1",
				"market_id": "SH",
				"trade_type": "0",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": "10-22"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"0",
				"market_id": "SH",
				"trade_type": "1",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": "20171015"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"0",
				"market_id": "SH",
				"trade_type": "0",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": "20171015"
			},
			{
				"productNo": "5263",
				"productName": "技术达人",
				"stock_code": "000001",
				"stock_name": "中国平安",
				"hideStock":"0",
				"market_id": "SH",
				"trade_type": "1",
				"exec_time": "10:03",
				"exec_qty": "1000",
				"exec_price": "4.06",
				"exec_date": "20171015"
			}
		]
	});

});
//获取推荐组合列表
router.post('/getRecommendProductList', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		"status": 1,
		"data": [
			{
				"productNo": "5232",
				"productName": "技术达人",
				'phototg':'https://stock.pingan.com/upload/20170503/201705031493791570462.jpg',
				"adviserName": "张海飞",
				"stockCount": "9",
				"tradeRate": "高",
				"winOdd": "27.0273",
				"retreat": "15.1934",
				"totalYield": "105.3234",
				"dateFound": "2016.06",
				"productStyle": "底部选股 波浪理论",
				"tags": ["收益最高","技术达人", "收益最高","技术达人"],
				"liveComments": ["财运滚滚来","谢谢投顾老师","赚钱了"],
				'liveCommentsUrl':'https://stock.stg.pingan.com/invest/liveRoom/interact.html?channelId=20160905f08712e131464bb3b7122c88b8013be8&stockId=20170904231d0286fd034a5484b190483252e648&type=02'
			},
			{
			"productNo": "5266",
			"productName": "轻松涨",
			'phototg':'https://stock.pingan.com/upload/20170503/201705031493791570462.jpg',
			"adviserName": "李轩群",
			"stockCount": "9",
			"tradeRate": "高",
			"winOdd": "77.94",
			"retreat": "20.09",
			"totalYield": "316.32",
			"dateFound": "2015.03",
			"productStyle": "底部选股 波浪理论",
			"tags": ["近一月+18.77%","抓涨停"],
			"liveComments": ["财运滚滚来","谢谢投顾老师","赚钱了"]
			}
		]
	});

});
//获取量化策略组合列表
router.post('/getStrategyList', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		"status": 1,
		"data": [
			{
				"strategyNo": "5263",
				"strategyName": "资金先锋",
				"winOdd": "0.3754", // 胜率
				"winPeople": "43%", // 跑赢87%的股民
				"totalYield": "0.31632", // 累计收益
				"productStyle": "监控资金力度，控盘力度大，资金流入多的股票"
			},
			{
				"strategyNo": "5288",
				"strategyName": "均线粘合",
				"winOdd": "0.7698", // 胜率
				"winPeople": "68%", // 跑赢87%的股民
				"totalYield": "0.34515", // 累计收益
				"productStyle": "监控资金力度，控盘力度大，资金流入多的股票"
			}
		]
	});

});
//找投顾
router.post('/invest/chaogu/getAdviserList', function(req, res) {

   var body = req.body;

    res.json({
    	err: 0,
		status: 1,
		data: {
			center: [
				{
					"liveroomId": 123346,
					"practiceNumber": '007',
					"adviserType": "铁牌",
					"fansNum": "10000",
					"userUm": "WANGFEI254",
					"userName": "李玄群",
					"userId": '21435416',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 15,
					"branchNo": "3076",
					"branchName":"上海"
				}, {
					"liveroomId": 533655,
					"practiceNumber": '001',
					"adviserType": "青衣坊",
					"fansNum": "4352",
					"userUm": "LIMING254",
					"userName": "小小明",
					"userId": '3241345',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 10,
					"branchNo": "3000",
					"branchName":"北京"
			}],
			user: [
				{
					"liveroomId": 123346,
					"practiceNumber": '007',
					"adviserType": "铁牌",
					"fansNum": "10000",
					"userUm": "WANGFEI254",
					"userName": "李玄群",
					"userId": '21435416',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 15,
					"branchNo": "3076",
					"branchName":"上海"
				}, {
					"liveroomId": 533655,
					"practiceNumber": '001',
					"adviserType": "青衣坊",
					"fansNum": "4352",
					"userUm": "LIMING254",
					"userName": "小小明",
					"userId": '3241345',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 10,
					"branchNo": "3000",
					"branchName":"北京"
			}],
			local: [
				{
					"liveroomId": 123346,
					"practiceNumber": '007',
					"adviserType": "铁牌",
					"fansNum": "10000",
					"userUm": "WANGFEI254",
					"userName": "李玄群",
					"userId": '21435416',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 15,
					"branchNo": "3076",
					"branchName":"上海"
				}, {
					"liveroomId": 533655,
					"practiceNumber": '001',
					"adviserType": "青衣坊",
					"fansNum": "4352",
					"userUm": "LIMING254",
					"userName": "小小明",
					"userId": '3241345',
					"adviserManagerCover": '/images/service/per1.jpg',
					"workingYear": 10,
					"branchNo": "3000",
					"branchName":"北京"
			}],
		}
			
	});

});
module.exports = router;