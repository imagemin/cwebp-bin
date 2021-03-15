'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const urlPrefix = process.env.RAW_GITHUBUSERCONTENT_LOCAL_URL ||
	process.env.npm_config_imagemin_local_url ||
	process.env.IMAGEMIN_LOCAL_URL ||
	'https://raw.githubusercontent.com/imagemin';

const url = `${urlPrefix}/cwebp-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}osx/cwebp`, 'darwin')
	.src(`${url}linux/x86/cwebp`, 'linux', 'x86')
	.src(`${url}linux/x64/cwebp`, 'linux', 'x64')
	.src(`${url}win/x64/cwebp.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');
