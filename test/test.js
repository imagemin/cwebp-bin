'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const cwebp = require('..');

test.cb('rebuild the cwebp binaries', t => {
	const tmp = tempy.directory();
	const builder = new BinBuild()
		.src('http://downloads.webmproject.org/releases/webp/libwebp-0.6.0.tar.gz')
		.cmd(`./configure --disable-shared --prefix="${tmp}" --bindir="${tmp}"`)
		.cmd('make && make install');

	builder.run(err => {
		t.ifError(err);
		t.true(fs.existsSync(path.join(tmp, 'cwebp')));
		t.end();
	});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(cwebp, ['-version']));
});

test('minify and convert a PNG to WebP', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test-png.webp');
	const args = [
		src,
		'-o', dest
	];

	await execa(cwebp, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});

test('minify and convert a JPG to WebP', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(tmp, 'test-jpg.webp');
	const args = [
		src,
		'-o', dest
	];

	await execa(cwebp, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
