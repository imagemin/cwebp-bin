import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/imagemin/cwebp-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}osx/arm64/cwebp`, 'darwin', 'arm64')
	.src(`${url}osx/x86-64/cwebp`, 'darwin', 'x86-64')
	.src(`${url}linux/aarch64/cwebp`, 'linux', 'aarch64')
	.src(`${url}linux/x64/cwebp`, 'linux', 'x64')
	.src(`${url}win/x64/cwebp.exe`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');

export default binWrapper;
