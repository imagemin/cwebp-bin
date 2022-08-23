import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

(async () => {
	try {
		// On linux platforms with non-intel architectures, bin-wrapper still
		// downloads and tries to execute the x86_64 ELF. This results in the
		// binary file being interpreted as a shell script, which creates a
		// dangling file that can make npm or yarn crash at installation. This
		// condition prevents this from happening.
		//
		// See https://github.com/imagemin/gifsicle-bin/issues/124#issuecomment-1222646680
		if (process.platform === 'linux' && !['ia32', 'x64'].includes(process.arch)) {
			throw Error(`Unsupported platform: ${process.platform}/${process.arch}.`);
		}

		await bin.run(['-version']);
		console.log('cwebp pre-build test passed successfully');
	} catch (error) {
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
	}
})();
