var glob = require("glob");
var Buffer = require("buffer").Buffer;
var crypto = require("crypto");

exports = module.exports = function(env, data) {
	var data = data || {},
		CDN_ADDRESS = data.CDN_ADDRESS,
		CONTEXT_PATH = data.CONTEXT_PATH;
	return {
		getJSFiles: function(pattern){

		},
		cdn: function(url){
			CDN_ADDRESS = CDN_ADDRESS || '';
			return CDN_ADDRESS + url;
		},
		getFileMd5: function(){
			var buf = new Buffer(data);
			var str = buf.toString("binary");
			return crypto.createHash('md5').update(str).digest("hex").substring(0, 10);
		}
	}
}