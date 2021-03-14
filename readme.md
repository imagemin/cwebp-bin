# cwebp-bin ![GitHub Actions Status](https://github.com/imagemin/cwebp-bin/workflows/test/badge.svg?branch=master)

> [WebP](https://developers.google.com/speed/webp/) is a new image format that provides lossless and lossy compression for images on the web. WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller in size compared to JPEG images at equivalent SSIM index.

You probably want [`imagemin-webp`](https://github.com/imagemin/imagemin-webp) instead.


## Install

```
$ npm install cwebp-bin
```

### Downloading From a Custom Source
By default, this package will download cwebp-bin from GitHub. To use a custom source, set the npm config property `imagemin_local_url`. The downloader will append `/<name>/<version>/vendor/<dist>`.

```
$ npm install cwebp-bin --imagemin_local_url=https://mymirror.local/path
```

Or add property into your `.npmrc` file([https://docs.npmjs.com/files/npmrc](https://docs.npmjs.com/files/npmrc))

```
imagemin_local_url=https://mymirror.local/path
```

Another option is to use the environment variable `IMAGEMIN_LOCAL_URL`.

```
$ IMAGEMIN_LOCAL_URL=https://mymirror.local/path npm install cwebp-bin
```


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
