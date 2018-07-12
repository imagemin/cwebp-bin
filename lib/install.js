'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-version'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('cwebp pre-build test failed');
		log.info('compiling from source');

		const builder = binBuild.url('http://downloads.webmproject.org/releases/webp/libwebp-0.6.1.tar.gz', [
			`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make && make install'
		]);

		return builder
			.then(() => {
				log.success('cwebp built successfully');
			})
			.catch(err => {
				log.error(err.stack);
			});
	}

	log.success('cwebp pre-build test passed successfully');
});
