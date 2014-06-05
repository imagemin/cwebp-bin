# [node-cwebp-bin](https://www.npmjs.org/package/cwebp-bin)

[![Build Status](https://travis-ci.org/1000ch/node-cwebp-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-cwebp-bin)
[![NPM version](https://badge.fury.io/js/cwebp-bin.svg)](http://badge.fury.io/js/cwebp-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-cwebp-bin.svg)](https://david-dm.org/1000ch/node-cwebp-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-cwebp-bin/dev-status.svg)](https://david-dm.org/1000ch/node-cwebp-bin#info=devDependencies)

## Dependency

WebP requires following libraries. See [detail](https://developers.google.com/speed/webp/docs/compiling).

### Linux

```sh
$ sudo apt-get install libjpeg-dev libpng-dev libtiff-dev libgif-dev
```

### Mac OS X

```sh
$ sudo port install jpeg libpng tiff giflib
```

## Install

```sh
$ npm install --save cwebp-bin
```

## Usage

### Command Line

```sh
$ cwebp input.png -o output.webp
```

### From source file

```js
var execFile = require('child_process').execFile;
var cwebp = require('cwebp-bin').path;

execFile(cwebp, ['input.png', '-o', 'output.webp'], function (error) {
  if (error) {
    throw error;
  }

  console.log('Image was converted');
});
```

## License

This is licensed under BSD.
WebP is licensed under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/).