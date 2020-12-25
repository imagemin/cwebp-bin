'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');
const getArgument = (name, args) => {
	var flags = args || process.argv.slice(2);
	var	index = flags.lastIndexOf(name);
	if (index === -1 || index + 1 >= flags.length) {
		return null;
	}
	return flags[index + 1];
}
const site = getArgument('--cwebp-binary-site') ||
	process.env.npm_config_cwebp_binary_site ||
	`https://raw.githubusercontent.com/imagemin`;
const url = [site, '/cwebp-bin/v', pkg.version, '/vendor/'].join('');
module.exports = new BinWrapper()
	.src(`${url}osx/cwebp`, 'darwin')
	.src(`${url}linux/x86/cwebp`, 'linux', 'x86')
	.src(`${url}linux/x64/cwebp`, 'linux', 'x64')
	.src(`${url}win/x64/cwebp.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');
