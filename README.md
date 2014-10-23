# cwebp-bin [![Build Status](http://img.shields.io/travis/imagemin/cwebp-bin.svg?style=flat)](http://travis-ci.org/imagemin/cwebp-bin)

> WebP is a new image format that provides lossless and lossy compression for images on the web. WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller in size compared to JPEG images at equivalent SSIM index.


## Install

```sh
$ npm install --save cwebp-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var cwebp = require('cweb-bin').path;

execFile(cwebp, ['input.png', '-o', 'output.webp'], function (err) {
	if (err) {
		throw err;
	}

	console.log('Image is converted!');
});
```


## CLI

```sh
$ npm install --global cwebp-bin
```

```sh
$ cwebp --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
