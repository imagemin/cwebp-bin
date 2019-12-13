'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

function getBinaryUrl(version) {
	const site =
		process.env.CWEBP_BINARY_SITE ||
		process.env.npm_config_cwebp_binary_site ||
		'https://raw.githubusercontent.com/imagemin/cwebp-bin';

	return [site, 'v' + version, 'vendor/'].join('/');
}

const url = getBinaryUrl(pkg.version);

module.exports = new BinWrapper()
	.src(`${url}osx/cwebp`, 'darwin')
	.src(`${url}linux/x86/cwebp`, 'linux', 'x86')
	.src(`${url}linux/x64/cwebp`, 'linux', 'x64')
	.src(`${url}win/x86/cwebp.exe`, 'win32', 'x86')
	.src(`${url}win/x64/cwebp.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');
