import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['-version']).then(() => {
	console.log('cwebp pre-build test passed successfully');
}).catch(error => {
	console.warn(error.message);
	console.warn('cwebp pre-build test failed');
	console.info('compiling from source');

	try {
		const source = fileURLToPath(new URL('../vendor/source/libwebp-1.2.1.tar.gz', import.meta.url));

		binBuild.file(source, [
			`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make && make install',
		]);

		console.log('cwebp built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
