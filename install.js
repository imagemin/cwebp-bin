'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var log = require('logalot');
var path = require('path');
var pkg = require('./package.json');

var BASE_URL = 'https://raw.github.com/imagemin/cwebp-bin/v' + pkg.version + '/vendor/';
var main = require('./');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/cwebp', 'darwin')
	.src(BASE_URL + 'linux/cwebp', 'linux')
	.src(BASE_URL + 'win/cwebp.exe', 'win32')
	.dest(path.dirname(main.path))
	.use(path.basename(main.path));

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['-version'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('cwebp pre-build test failed');
		log.info('compiling from source');

		var cfg = [
			'./configure --disable-shared --prefix="' + bin.dest() + '"',
			'--bindir="' + bin.dest() + '"'
		].join(' ');

		var builder = new BinBuild()
			.src('http://downloads.webmproject.org/releases/webp/libwebp-' + main.version + '.tar.gz')
			.cmd(cfg)
			.cmd('make && make install');

		builder.run(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('cwebp built successfully');
		});

		return;
	}

	log.success('cwebp pre-build test passed successfully');
});
