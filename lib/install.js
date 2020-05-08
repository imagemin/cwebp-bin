'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const path = require('path');
const bin = require('.');

bin.run(['-version']).then(() => {
	log.success('cwebp pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('cwebp pre-build test failed');
	log.info('compiling from source');

	binBuild.file(path.resolve(__dirname, '../vendor/source/libwebp-1.0.2.tar.gz'), [
		`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		'make && make install'
	]).then(() => { // eslint-disable-line promise/prefer-await-to-then
		log.success('cwebp built successfully');
	}).catch(error => {
		log.error(error.stack);
	});
});
