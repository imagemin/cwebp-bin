'use strict';

var bin = require('../');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var execFile = require('child_process').execFile;
var fs = require('fs');
var mkdir = require('mkdirp');
var path = require('path');
var rm = require('rimraf');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the cwebp binaries', function (t) {
	t.plan(3);

	var builder = new BinBuild()
		.src('http://downloads.webmproject.org/releases/webp/libwebp-' + bin.version + '.tar.gz')
		.cmd('./configure --disable-shared --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make && make install');

	builder.build(function (err) {
		t.assert(!err);

		fs.exists(path.join(tmp, require('../lib').use()), function (exists) {
			t.assert(exists);

			rm(tmp, function (err) {
				t.assert(!err);
			});
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(bin.path, ['-version'], function (err, works) {
		t.assert(!err);
		t.assert(works);
	});
});

test('minify and convert a PNG to WebP', function (t) {
	t.plan(5);

	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test-png.webp');
	var args = [
		src,
		'-o', dest
	];

	mkdir(tmp, function (err) {
		t.assert(!err);

		execFile(bin.path, args, function (err) {
			t.assert(!err);

			compareSize(src, dest, function(err, res) {
				t.assert(!err, err);
				t.assert(res[dest] < res[src]);

				rm(dest, function (err) {
					t.assert(!err, err);
				});
			});
		});
	});
});

test('minify and convert a JPG to WebP', function (t) {
	t.plan(5);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test-jpg.webp');
	var args = [
		src,
		'-o', dest
	];

	mkdir(tmp, function (err) {
		t.assert(!err);

		execFile(bin.path, args, function (err) {
			t.assert(!err);

			compareSize(src, dest, function(err, res) {
				t.assert(!err, err);
				t.assert(res[dest] < res[src]);

				rm(dest, function (err) {
					t.assert(!err, err);
				});
			});
		});
	});
});
