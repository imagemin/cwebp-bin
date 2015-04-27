'use strict';

var path = require('path');
var BinWrapper = require('bin-wrapper');
var pkg = require('../package.json');
var url = 'https://raw.githubusercontent.com/imagemin/cwebp-bin/v' + pkg.version + '/vendor/';

module.exports = new BinWrapper()
	.src(url + 'osx/cwebp', 'darwin')
	.src(url + 'linux/cwebp', 'linux')
	.src(url + 'win/cwebp.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');
