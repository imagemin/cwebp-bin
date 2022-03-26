import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import tempy from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import cwebp from '../index.js';

test('rebuild the cwebp binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = tempy.directory();
	const source = fileURLToPath(new URL('../vendor/source/libwebp-1.2.1.tar.gz', import.meta.url));

	await binBuild.file(source, [
		`./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
		'make && make install',
	]);

	t.true(fs.existsSync(path.join(temporary, 'cwebp')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(cwebp, ['-version']));
});

test('minify and convert a PNG to WebP', async t => {
	const temporary = tempy.directory();
	const src = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
	const dest = path.join(temporary, 'test-png.webp');
	const args = [
		src,
		'-o',
		dest,
	];

	await execa(cwebp, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});

test('minify and convert a JPG to WebP', async t => {
	const temporary = tempy.directory();
	const src = fileURLToPath(new URL('fixtures/test.jpg', import.meta.url));
	const dest = path.join(temporary, 'test-jpg.webp');
	const args = [
		src,
		'-o',
		dest,
	];

	await execa(cwebp, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
