'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var log = require('imagemin-log');

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['-version'], function (err) {
	if (err) {
		log.warn('cwebp pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('http://downloads.webmproject.org/releases/webp/libwebp-' + bin.v + '.tar.gz')
			.cmd('./configure --disable-shared --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
			.cmd('make && make install');

		return builder.build(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('cwebp built successfully');
		});
	}

	log.success('cwebp pre-build test passed successfully');
});
