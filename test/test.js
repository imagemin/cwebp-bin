'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var mkdir = require('mkdirp');
var path = require('path');
var rm = require('rimraf');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the cwebp binaries', function (t) {
	t.plan(3);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('http://downloads.webmproject.org/releases/webp/libwebp-' + version + '.tar.gz')
		.cmd('./configure --disable-shared --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make && make install');

	builder.build(function (err) {
		t.assert(!err);

		fs.exists(path.join(tmp, 'cwebp'), function (exists) {
			t.assert(exists);

			rm(tmp, function (err) {
				t.assert(!err);
			});
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['-version'], function (err, works) {
		t.assert(!err);
		t.assert(works);
	});
});

test('minify and convert a PNG to WebP', function (t) {
	t.plan(5);

	var args = [
		path.join(__dirname, 'fixtures/test.png'),
		'-o', path.join(tmp, 'test.webp')
	];

	mkdir(tmp, function (err) {
		t.assert(!err);

		execFile(require('../').path, args, function (err) {
			t.assert(!err);

			fs.stat(path.join(__dirname, 'fixtures/test.png'), function (err, a) {
				t.assert(!err);

				fs.stat(path.join(tmp, 'test.webp'), function (err, b) {
					t.assert(!err);
					t.assert(b.size < a.size);
				});
			});
		});
	});
});

test('minify and convert a JPG to WebP', function (t) {
	t.plan(5);

	var args = [
		path.join(__dirname, 'fixtures/test.jpg'),
		'-o', path.join(tmp, 'test.webp')
	];

	mkdir(tmp, function (err) {
		t.assert(!err);

		execFile(require('../').path, args, function (err) {
			t.assert(!err);

			fs.stat(path.join(__dirname, 'fixtures/test.jpg'), function (err, a) {
				t.assert(!err);

				fs.stat(path.join(tmp, 'test.webp'), function (err, b) {
					t.assert(!err);
					t.assert(b.size < a.size);
				});
			});
		});
	});
});
