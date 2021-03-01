# cwebp-bin ![GitHub Actions Status](https://github.com/imagemin/cwebp-bin/workflows/test/badge.svg?branch=master)

> [WebP](https://developers.google.com/speed/webp/) is a new image format that provides lossless and lossy compression for images on the web. WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller in size compared to JPEG images at equivalent SSIM index.

You probably want [`imagemin-webp`](https://github.com/imagemin/imagemin-webp) instead.


## Install

```
$ npm install cwebp-bin
```

#### Specify binary base url

Provide ability to locally mirror cwebp-bin binaries for various versions and platforms.
- Environment Variable
	`$ CWEBP_BINARY_SITE=https://npm.taobao.org/mirrors/cwebp-bin yarn install`
- npm config variable
  `$ echo "cwebp_binary_site=https://npm.taobao.org/mirrors/cwebp-bin" >> .npmrc`


## Usage

```js
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

execFile(cwebp, ['input.png', '-o', 'output.webp'], err => {
	if (err) {
		throw err;
	}

	console.log('Image is converted!');
});
```


## CLI

```
$ npm install --global cwebp-bin
```

```
$ cwebp --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
