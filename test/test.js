/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('cwebp()', function () {
	afterEach(function (callback) {
		rm(path.join(__dirname, 'tmp'), callback);
	});

	beforeEach(function () {
		fs.mkdirSync(path.join(__dirname, 'tmp'));
	});

	it('should rebuild the cwebp binaries', function (callback) {
		var tmp = path.join(__dirname, 'tmp');
		var builder = new BinBuild()
			.src('http://downloads.webmproject.org/releases/webp/libwebp-0.4.1.tar.gz')
			.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
			.cmd('make && make install');

		builder.build(function (error) {
			if (error) {
				return callback(error);
			}
			assert(fs.existsSync(path.join(tmp, 'cwebp')));
			callback();
		});
	});

	it('should return path to binary and verify that it is working', function (callback) {
		var binPath = require('../').path;
		var args = [
			path.join(__dirname, 'fixtures/test.png'),
			'-o',
			path.join(__dirname, 'tmp/test.webp')
		];

		binCheck(binPath, args, function (error, works) {
			if (error) {
				return callback(error);
			}
			assert.equal(works, true);
			callback();
		});
	});

	it('should convert PNG to WebP', function (callback) {
		var binPath = require('../').path;
		var args = [
			path.join(__dirname, 'fixtures/test.png'),
			'-o',
			path.join(__dirname, 'tmp/test-png.webp')
		];

		execFile(binPath, args, function (error) {
			if (error) {
				return callback(error);
			}
			assert(fs.statSync(path.join(__dirname, 'tmp/test-png.webp')))
			callback();
		});
	});

	it('should convert JPG to WebP', function (callback) {
		var binPath = require('../').path;
		var args = [
			path.join(__dirname, 'fixtures/test.jpg'),
			'-o',
			path.join(__dirname, 'tmp/test-jpg.webp')
		];

		execFile(binPath, args, function (error) {
			if (error) {
				return callback(error);
			}
			assert(fs.statSync(path.join(__dirname, 'tmp/test-jpg.webp')))
			callback();
		});
	});
});
