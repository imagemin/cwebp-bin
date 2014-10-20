'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = '0.4.2';
var BASE_URL = 'https://raw.github.com/imagemin/cwebp-bin/v' + pkg.version + '/vendor/';

/**
 * Initialize a new BinWrapper
 */

 var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/cwebp', 'darwin')
	.src(BASE_URL + 'linux/cwebp', 'linux')
	.src(BASE_URL + 'win/cwebp.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;
