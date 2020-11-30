var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var pump = require('pump');
var through2 = require("through2");
var ejs = require("gulp-ejs");
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');
// var shell = require('child_process');
var pkg = require('./package.json');
var merge = require("merge-stream");
var Utils = require("./utils");
var htmlmin = require('gulp-htmlmin');
var concatTGTpl = require('gulp-concat-tg-tpl');
var glob = require('glob');
//增加缓存
var cached = require('gulp-cached');
// var rename = require('gulp-rename');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
const args = require('yargs').argv;

var rollup = require('gulp-better-rollup');
var rollupBabel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

// 设置默认工作目录为./www
process.chdir("www");

// 获取env
var env = args.env;
var BUILD_TIMESTAMP = args.ts || gutil.date(new Date(), "yyyymmddHHMMss");

pkg.build = BUILD_TIMESTAMP;

var CONTEXT_PATH = "/invest",
    CDN_ADDRESS = '';
if (env != "DEV") {
    switch (env) {
        case "FAT":
            CONTEXT_PATH = "/invest";
            break;
        case "UAT":
            CONTEXT_PATH = "/invest";
            // CDN_ADDRESS = 'https://pacdn-m.stg.pingan.com';
            break;
        case "PRD":
            CONTEXT_PATH = "/invest";
            CDN_ADDRESS = 'https://pacdn.m.stock.pingan.com';
            break;
        case "PRDTEST":
            CONTEXT_PATH = "/invest";
            break;
        default:
            CONTEXT_PATH = "/.";
    }
}


var Config = {
    src: ".",
    dest: "../dist",
    patch: "../patch",
    output: "../output",
    templates: "../templates"
};

_.extend(Config, {
    // 拷贝路径
    copy_src: [
        Config.src + "/**/*",
        "!" + Config.src + "/less",
        "!" + Config.src + "/less/**",
        "!" + Config.src + "/prototype",
        "!" + Config.src + "/prototype/**",
        "!" + Config.src + "/modules",
        "!" + Config.src + "/modules/**",
        "!" + Config.src + "/js/common/**"
    ],
    copy_2_src: [
        Config.src + "/modules/app.js",
        Config.src + "/modules/VueHelper.js",
    ],
    copy_dest: Config.dest,
    // 清空路径
    clean_src: Config.dest + '/*',
    // 清空路径
    clean_patch: Config.patch + '/*',
    // ejs源文件路径
    ejs_src: [
        Config.templates + "/**/*.ejs",
        "!" + Config.templates + "/include/**/*.ejs"
    ],
    ejs_dest: Config.dest,
    // 源码路径
    source_src: [
        Config.src + "/js*/**/*.js",
        Config.src + "/modules*/**/*.js",
        Config.src + "/lib*/**/*.js"
    ],
    // 源码目标地址
    source_dest: Config.dest + "/src",
    // less文件地址
    less_src: Config.src + "/less/*.less",
    // less目标地址
    less_dest: Config.dest + '/css',
    minifycss_src: Config.src + '/**/*.css',
    minifycss_dest: Config.dest,
    babel_src: [
        Config.src + "/modules/**/*.es6.js",
        Config.src + '/js/**/*.es6.js'
    ],
    babel_dest: Config.dest + '/src',
    pm_src: [
        Config.src + '/pm/*/*.js'
    ],
    pm_dest: Config.dest,
    uglifyjs_src: [
        Config.dest + '/modules*/**/*.js',
        Config.dest + '/js*/**/*.js'
    ],
    uglifyjs_dest: Config.dest,
    md5_src: Config.src + '/images/**/*',
    md5_dest: Config.dest,
    optimizeFilesNum: 25,
    archive_src: Config.dest + '/**/*',
    optimize_src: Config.dest + '/src',
    optimize_concat_src: Config.src + '/?(modules|js)/!(common|filters' + (env === 'ENV' ? '|demo' : '') + '|directives|component)/*.js',
    optimize_dest: Config.dest,
    // require优化排除公共库
    optimize_exclude: [],
    // require优化排除公共库
    exclude: {
        "zepto": 'empty:',
        'highcharts': 'empty:',
        'highchartsMore': 'empty:',
        'Chart': 'empty:',
        'highstock': 'empty:',
        'vue': 'empty:'
    }
})

var Utils = new Utils(env, {CONTEXT_PATH: CONTEXT_PATH, CDN_ADDRESS: CDN_ADDRESS});
var FILE_MD5_LIST = [];
(function(){
    var files = glob.sync(Config.md5_src);
    for(var i = 0;i<files.length;i++){
        var file=files[i];
        if(!fs.statSync(file).isDirectory()){
            var md5Str = Utils.getFileMd5(fs.readFileSync(file));
            FILE_MD5_LIST.push({
                path: file,
                md5:md5Str,
                obj: path.parse(file)
            })
        }
    }
})();

var handleEnv = function() {
    return through2.obj(function(file, enc, cb) {
        if (file.path.indexOf("version.js") != -1) {
            file.contents = new Buffer(file.contents.toString().replace("new Date().getTime()", '"' + BUILD_TIMESTAMP + '"'));
        }
        return cb(null, file);
    });
};

var handleEjsImage = function() {
    return through2.obj(function(file, enc, cb) {
        var content = file.contents.toString();
        file.contents = new Buffer(file.contents.toString().replace(/(<img[^\<\>]*?) src="(.+?\/images\/.+?)"/ig, function($0, $1, $2) {
            var tmp = '', matchedFile, version = 'v=', i;
            if ($2.indexOf('http') !== 0) {
                $2 = $2.substring($2.indexOf('/images'), $2.length);
                tmp = '.' + $2;
                if ($2.indexOf('?') !== -1) {
                    tmp = $2.substring(0, $2.indexOf('?'));
                }
                for (i = 0; i < FILE_MD5_LIST.length; i++) {
                    if (FILE_MD5_LIST[i].path === tmp) {
                        matchedFile = FILE_MD5_LIST[i];
                        break;
                    }
                }
                if (matchedFile) {
                    version += matchedFile.md5
                } else {
                    version += BUILD_TIMESTAMP
                }
                if ($2.indexOf('?') !== -1) {
                    $2 += version;
                } else {
                    $2 += '?' + version;
                }
                tmp = Utils.cdn(CONTEXT_PATH + $2);
                if (tmp !== CONTEXT_PATH + $2) {
                    return $1 + ' src="' + Utils.cdn(CONTEXT_PATH + $2) + '"';
                } else {
                    return $0;
                }
            } else {
                return $0;
            }
        }));
        return cb(null, file);
    });
};

var handleLessImage = function() {
    return through2.obj(function(file, enc, cb) {
        var content = file.contents.toString();
        file.contents = new Buffer(file.contents.toString().replace(/(\/images\/[^\)]*)\)/ig, function($0, $1) {
            var tmp = '.' + $1, matchedFile, version = 'v=', i;
            tmp = tmp.replace(/['"]/, '');
            for (i = 0; i < FILE_MD5_LIST.length; i++) {
                if (FILE_MD5_LIST[i].path === tmp) {
                    matchedFile = FILE_MD5_LIST[i];
                    break;
                }
            }
            if (matchedFile) {
                version += matchedFile.md5
            } else {
                version += BUILD_TIMESTAMP
            }
            $1 = $1.replace(/([^'"]*)(['"]?)/, function($0, $1, $2) {
                return $1 + '?' + version + $2;
            });
            return $1 + ')';
        }));
        return cb(null, file);
    })
};

/*
 * 清空目标工程目录
 */
gulp.task('clean', function() {
    return gulp.src(Config.clean_src, {
            read: false
        })
        .pipe(rimraf({
            force: true
        }));
});

/*
 * 拷贝文件到目标工程目录
 */
gulp.task('copy', function() {
    return gulp.src(Config.copy_src)
        .pipe(handleEnv())
        .pipe(gulp.dest(Config.dest));
});
/*
 * 拷贝文件到目标工程目录
 */
gulp.task('copy2', function() {
    return gulp.src(Config.copy_2_src)
        .pipe(handleEnv())
        .pipe(gulp.dest(Config.dest + '/modules'));
});

/*
 * 拷贝源文件文件到目标工程目录
 */
gulp.task('source', function() {
    return gulp.src(Config.source_src)
        .pipe(gulp.dest(Config.source_dest));
});
/*
 * 编译ejs页面
 */
gulp.task("ejs", function() {
    return gulp.src(Config.ejs_src)
        .pipe(ejs({
            ctx: CONTEXT_PATH,
            _build: {
                pkg: pkg,
                version: pkg.version,
                ts: BUILD_TIMESTAMP,
                env: env,
                cdn: CDN_ADDRESS
            },
            Utils: Utils,
            _: _,
            data: {}
        }, {
            delimiter: "@",
            root: __dirname + "/templates"
        }, {
            ext: '.html'
        }))
        .pipe(htmlmin({
            removeComments: true, 
            collapseWhitespace: true, 
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(handleEjsImage())
        .pipe(gulp.dest(Config.ejs_dest))
        .pipe(gulp.dest(Config.output + '/differ/' + env.toLowerCase()));
});

/*
 * 编译less
 */
gulp.task('less', function() {
    return gulp.src(Config.less_src)
        .pipe(less({
            Config: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(handleLessImage())
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest(Config.less_dest));
});

gulp.task('2es5', function () {
    return gulp.src(Config.babel_src, {
        base: Config.src
    })
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": [
                "@babel/preset-env"
            ],
            "plugins": [
                "@babel/plugin-transform-modules-amd"
            ]
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(Config.babel_dest))
});

gulp.task('pm', function() {
    return gulp.src(Config.pm_src, {
            base: Config.src
        })
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                nodeResolve({
                    jsnext: true,
                    main: true,
                    browser: true
                }),
                commonjs({
                    include: 'node_modules/**',
                    sourceMap: false
                }),
                rollupBabel({
                    exclude: 'node_modules/**' // 只编译我们的源代码
                })
            ],
            external: [
                'zepto'
            ]
        }, {
            format: 'iife',
            globals: {
                zepto: '$'
            }
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(Config.pm_dest))
});

/*
 * 编译压缩js
 */
gulp.task('uglifyjs', function(cb) {
        pump([
            gulp.src(Config.uglifyjs_src),
            uglify(),
            gulp.dest(Config.uglifyjs_dest)
        ],
        cb
      );
});

/**
 * 合并ejs模板
 **/
gulp.task('concatEjsTpl2Js', function() {
    return gulp.src([
            Config.dest + '/modules/**/*.js'
        ])
        .pipe(concatTGTpl({ srcPath: Config.templates, prefix: '/invest', minify: true, basepath: Config.dest }))
        .pipe(gulp.dest(Config.dest + ''))
});

/**
 * 合并require
 **/
gulp.task('concat_loader', function() {
    gulp.src([
            "lib/require.js",
            "lib/require-config.js"
        ])
        .pipe(concat("loader.min.js"))
        .pipe(uglify().on("error", gutil.log))
        .pipe(gulp.dest(Config.dest + "/lib"))
});
/*
 * require js 优化
 */

gulp.task("js_optimize_old", function() {
    var sequence = [];
    sequence.push(
        // 优化common
        gulp.src(Config.optimize_src + "/js/**/*.js")
        .pipe(amdOptimize("C", {
            configFile: Config.src + "/lib/require-config.js",
            paths: Config.exclude,
            exclude: Config.optimize_exclude
        }))
        // 合并
        .pipe(concat("common.js"))
        // .pipe(uglify().on("error", gutil.log))
        // 输出
        .pipe(gulp.dest(Config.optimize_dest + "/js/common"))
    );
    var files = glob.sync(Config.optimize_concat_src)
    files.forEach(function (item) {
        var modulePath = item.replace(Config.optimize_src + '/', '');
        sequence.push(
            // 优化common
            gulp.src([Config.optimize_src + "/modules/**/*.js", Config.optimize_src + "/js/**/*.js"])
                .pipe(cached("JS_OPTIMIZE"))
                .pipe(amdOptimize(modulePath.replace('.js', ''), {
                    configFile: Config.src + "/lib/require-config.js",
                    baseUrl: Config.optimize_src,
                    paths: Config.exclude,
                    exclude: Config.optimize_exclude.concat(["C"])
                }))
                // 合并
                .pipe(concat(modulePath))
                // .pipe(uglify().on("error", gutil.log))
                // 输出
                .pipe(gulp.dest(Config.optimize_dest))
        )
    });
    return merge.apply(this, sequence);
});

// 创建js压缩任务
var tasks = [];
(function getJsOptimizeTasks(){
    gulp.task('js_optimize_common',function(){
        return gulp.src(Config.optimize_src + "/**/*.js", {base: Config.optimize_src})
            // .pipe(sourcemaps.init())
            .pipe(amdOptimize("C", {
                configFile: Config.src + "/lib/require-config.js",
                baseUrl: Config.optimize_src,
                exclude: Config.optimize_exclude
            }))
            // 合并
            .pipe(concat("common.js"))
            // .pipe(uglify().on("error", gutil.log))
            // .pipe(sourcemaps.write('../maps'))
            // 输出
            .pipe(gulp.dest(Config.optimize_dest + "/js/common"))
    });

    tasks.push('js_optimize_common');

    //获取文件
    var files = [], taskSourceArr = [];
    if (typeof Config.optimize_concat_src === 'string') {
        files = glob.sync(Config.optimize_concat_src);
    } else {
        Config.optimize_concat_src.forEach(item => {
            files = files.concat(glob.sync(item))
        });
    }
    //console.log(files);
    
    for (var i = 0; i < files.length / Config.optimizeFilesNum; i++) {
        taskSourceArr.push({
            name: 'js_optimize_modules_' + i,
            data: files.slice(i * Config.optimizeFilesNum, (i + 1) * Config.optimizeFilesNum)
        })
    }

    taskSourceArr.forEach(function(item) {
        tasks.push(item.name);
        createOptTask(item.data, item.name, [tasks[tasks.length - 2]]);
    });

    return tasks;
})()

gulp.task('js_optimize', tasks, function(callback) {
    console.log('JS_OPTIMIZE FINISHED SUCCESSFULLY');
    callback();
});

function createOptTask(modulePaths, taskName, depends) {
    gulp.task(taskName,depends,function(){
        var sequence = [];
        modulePaths.forEach(function(item) {
            var modulePath = item.replace(Config.optimize_src + '/', '');
            sequence.push(
                gulp.src([Config.optimize_src + "/modules/**/*.js", Config.optimize_src + "/js/**/*.js"])
                	.pipe(cached("JS_OPTIMIZE"))
                    .pipe(amdOptimize(modulePath.replace('.js', ''), {
                        configFile: Config.src + "/lib/require-config.js",
                        baseUrl: Config.optimize_src,
                        paths: Config.exclude,
                        exclude: Config.optimize_exclude.concat(["C"])
                    }))
                    // 合并
                    .pipe(concat(modulePath))
                    // 输出
                    .pipe(gulp.dest(Config.optimize_dest))
            )
        });
            
        return merge.apply(this, sequence);
    });
}

var j = 0
gulp.task('md5', function() {
    var base = Config.src;
    return gulp.src(Config.md5_src, { base: base})
        // .pipe(rename(function(pathObj) {
        //     var tmpPathObj, pathStr;
        //     if (pathObj.extname) {
        //         pathStr = base + '/' + pathObj.dirname;
        //         for (var i = 0; i < FILE_MD5_LIST.length; i++) {
        //             tmpPathObj = FILE_MD5_LIST[i].obj;
        //             if (j++ < 100) {
        //                 console.log(tmpPathObj, arguments);
        //             }
        //             if (tmpPathObj.dir === pathStr && tmpPathObj.name === pathObj.basename && tmpPathObj.ext === pathObj.extname) {
        //                 pathObj.extname = '.' + FILE_MD5_LIST[i].md5 + pathObj.extname;
        //                 break;
        //             }
        //         }
        //     }
        // }))
        .pipe(through2.obj(function(file, enc, cb) {
            if (j++ < 1) {
                console.dir(file)
            }
            this.push(file);
            cb()
        }))
        .pipe(gulp.dest(Config.md5_dest))
});

/*
 * 打包zip
 */
gulp.task('archive', function() {
    return gulp.src(Config.archive_src)
        .pipe(zip(pkg.name + "_v_" + pkg.version.replace(/\./g, "_") + "_" + env.toLowerCase() + "_" + BUILD_TIMESTAMP + '.zip'))
        .pipe(gulp.dest(Config.output));
});

// gulp.task('archive', function () {
//     return gulp.src('src/*')
//         .pipe(zip('archive.zip'))
//         .pipe(gulp.dest('dist'));
// });
gulp.task('watch', function() {
    gulp.watch(Config.src + "/less/**/*.less", ['less', 'copy']);
    gulp.watch(Config.src + "/**/*.js", ['copy']);
    gulp.watch("../**/*.ejs", ['ejs']);
});


/*
 * 部署到测试环境
 */
gulp.task('deploy', function() {});

gulp.task('clean_patch', function() {
    return gulp.src(Config.clean_patch, { read: false })
        .pipe(rimraf({ force: true }));
});

/*
 * 拷贝文件到目标工程目录
 */
gulp.task('copy_patch', function() {
    var filelist = fs.readFileSync("../patchlist.txt", "UTF-8");
    filelist = filelist.replace(/[\r\n]+/g,"|");
    var list = filelist.split("|");
    var rs = [];
    var obj = {};
    _.each(list, function(item) {
        // if (/^modules/.test(item)) {
        //     var items = item.split("/");
        //     item = [items[0], items[1], "**/*"].join("/");
        // }
        obj[item] = true;
    })
    for (var key in obj) {
        console.log(key);
        rs.push(key);
    }
    rs.push("js/version.js");
    return gulp.src(rs, { cwd: Config.dest, base: Config.dest })
        .pipe(gulp.dest(Config.patch));
});


/*
 * 开始构建
 */
gulp.task('patch', function(callback) {
    runSequence(
        "clean_patch",
        "copy_patch",
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

gulp.task('copy_patch_2_common', function() {
    return gulp.src(Config.patch + "/**/*", { cwd: Config.patch, base: Config.patch })
        .pipe(gulp.dest(Config.output + '/common'));
})

/*
 * 清空output目录
 */
gulp.task('clean_output', function() {
    return gulp.src(Config.output, {
            read: false
        })
        .pipe(rimraf({
            force: true
        }));
});

/*
 * 把dist拷贝到output目录下
 */
gulp.task('copy_output', function() {
    return gulp.src(Config.dest + "/**/*", { cwd: Config.dest, base: Config.dest })
        .pipe(gulp.dest(Config.output + "/differ/" + env.toLowerCase()));
});

/**
 * 创建各环境空目录（临时）
 */
gulp.task('mk_output', function() {
    fs.exists(Config.output, function (exists) {
        if (!exists) {
            fs.mkdir(Config.output, function (err) {
                if(err){
                    throw err;
                }
                fs.mkdir(Config.output + '/differ', function(err) {
                    if (err) {
                        throw err;
                    }
                    var envs = ['fat', 'uat', 'prd'];
                    envs.forEach(function(item) {
                        fs.exists(Config.output + "/differ/" + item, function(exists) {
                            if (!exists) {
                                fs.mkdir(Config.output + "/differ/" + item, function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }
                        });
                    });
                });
            });
        }
    });

    fs.exists(Config.output + '/common', function (exists) {
        if (!exists) {
            fs.mkdir(Config.output + '/common', function (err) {
                if(err){
                    throw err;
                }
            });
        }
    });
});

/**
 * 创建公共目录
 */
gulp.task('mk_common', function() {
    fs.mkdir(Config.output + '/common');
});

/**
 * 把dist拷贝到common目录下（临时）
 */
gulp.task('copy_common', function() {
    return gulp.src(Config.dest + "/**/*", { cwd: Config.dest, base: Config.dest })
        .pipe(gulp.dest(Config.output + '/common'));
});

/*
 * 打包zip
 */
gulp.task('archive_output', function() {
    return gulp.src(Config.output + "/**/*")
        .pipe(zip('invest.zip'))
        .pipe(gulp.dest('../' + Config.output));
});

/*
 * 开始构建
 */
gulp.task('build', function(callback) {
    runSequence(
    	'clean',
        'less',
        ['copy', 'copy2', 'ejs', 'source', 'concat_loader'],
        '2es5',
        'js_optimize',
        'pm',
        'uglifyjs',
        'concatEjsTpl2Js',
        // 'patch',
        //'archive',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

