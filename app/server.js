
var express = require('express');
var bodyParser = require('body-parser');
var Constant = require('./www/js/common/constant');
var ejs = require('ejs'),
    _ = require('underscore'),
    Utils = require('./utils'),
    pkg = require('./package.json');

var path = require('path'),
  gutil = require('gulp-util');
var babel = require("@babel/core");

var rollup = require('rollup');
var rollupBabel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var expressLess = require('express-less');
 app.use('/www/css', expressLess(__dirname + '/www/less'));
 app.use('/css', expressLess(__dirname + '/www/less'));

//设置静态路径
app.use('/www', express.static('www'));
app.use('/', express.static('www'));

//路径
var CONTEXT_PATH = "/www",
//构建时间
    BUILD_TIMESTAMP = gutil.date(new Date(), "yyyymmddHHMMss"),
//环境
    env = "DEV";

pkg.build = BUILD_TIMESTAMP;

//设置模板路径
app.set('views',  path.join(__dirname, 'templates')); // general config
//设置自定义模板
app.engine('ejs', function() {
  ejs.renderFile(arguments[0], {
    ctx: CONTEXT_PATH,
    _build: {
        pkg: pkg,
        version: pkg.version,
        ts: BUILD_TIMESTAMP,
        env: env,
        cdn: ''
    },
    Utils: new Utils(env, {CONTEXT_PATH: CONTEXT_PATH}),
    _: _,
    data: {}
  }, arguments[1], arguments[2]);
});
app.set('view engine', 'ejs');
ejs.delimiter = '@';

var index = require('./routes/index');

//app.use('.', [index]);

var request = require("request");

app.use('/*.html', function(req, res){
  res.render(req.params[0]);
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port; 
  console.log('Example app listening at http://%s:%s', host, port);
});


