'use strict';

var execFile = require('child_process').execFile;
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var pathExists = require('path-exists');
var cwebp = require('../');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the cwebp binaries', function (t) {
	t.plan(3);

	var builder = new BinBuild()
		.src('http://downloads.webmproject.org/releases/webp/libwebp-0.5.1.tar.gz')
		.cmd('./configure --disable-shared --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make && make install');

	builder.run(function (err) {
		t.assert(!err, err);

		pathExists(path.join(tmp, 'cwebp'), function (err, exists) {
			t.assert(!err, err);
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(cwebp, ['-version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify and convert a PNG to WebP', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test-png.webp');
	var args = [
		src,
		'-o', dest
	];

	execFile(cwebp, args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});

test('minify and convert a JPG to WebP', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test-jpg.webp');
	var args = [
		src,
		'-o', dest
	];

	execFile(cwebp, args, function (err) {
		t.assert(!err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});
