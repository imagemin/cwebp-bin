# [node-cwebp-bin](https://www.npmjs.org/package/cwebp-bin)

[![Build Status](https://travis-ci.org/1000ch/node-cwebp-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-cwebp-bin)
[![NPM version](https://badge.fury.io/js/cwebp-bin.svg)](http://badge.fury.io/js/cwebp-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-cwebp-bin.svg)](https://david-dm.org/1000ch/node-cwebp-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-cwebp-bin/dev-status.svg)](https://david-dm.org/1000ch/node-cwebp-bin#info=devDependencies)

## Examples

| ![](/raw/master/examples/png.png) | ![](/raw/master/examples/png.webp) |
|---|---|
| 8bit converted png | WebP converted |

| ![](/raw/master/examples/jpg.jpg) | ![](/raw/master/examples/jpg.webp) |
|---|---|
| JPEGMini optimized jpg | WebP converted |

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

### Options

```sh
Usage:
 cwebp [-preset <...>] [options] in_file [-o out_file]

If input size (-s) for an image is not specified, it is assumed to be a PNG, JPEG or TIFF file.
options:
  -h / -help  ............ short help
  -H / -longhelp  ........ long help
  -q <float> ............. quality factor (0:small..100:big)
  -alpha_q <int> ......... Transparency-compression quality (0..100).
  -preset <string> ....... Preset setting, one of:
                            default, photo, picture,
                            drawing, icon, text
     -preset must come first, as it overwrites other parameters.  -z <int> ............... Activates lossless preset with given                            level in [0:fast, ..., 9:slowest]

  -m <int> ............... compression method (0=fast, 6=slowest)
  -segments <int> ........ number of segments to use (1..4)
  -size <int> ............ Target size (in bytes)
  -psnr <float> .......... Target PSNR (in dB. typically: 42)

  -s <int> <int> ......... Input size (width x height) for YUV
  -sns <int> ............. Spatial Noise Shaping (0:off, 100:max)
  -f <int> ............... filter strength (0=off..100)
  -sharpness <int> ....... filter sharpness (0:most .. 7:least sharp)
  -strong ................ use strong filter instead of simple (default).
  -nostrong .............. use simple filter instead of strong.
  -partition_limit <int> . limit quality to fit the 512k limit on
                           the first partition (0=no degradation ... 100=full)
  -pass <int> ............ analysis pass number (1..10)
  -crop <x> <y> <w> <h> .. crop picture with the given rectangle
  -resize <w> <h> ........ resize picture (after any cropping)
  -mt .................... use multi-threading if available
  -low_memory ............ reduce memory usage (slower encoding)
  -map <int> ............. print map of extra info.
  -print_psnr ............ prints averaged PSNR distortion.
  -print_ssim ............ prints averaged SSIM distortion.
  -print_lsim ............ prints local-similarity distortion.
  -d <file.pgm> .......... dump the compressed output (PGM file).
  -alpha_method <int> .... Transparency-compression method (0..1)
  -alpha_filter <string> . predictive filtering for alpha plane.
                           One of: none, fast (default) or best.
  -alpha_cleanup ......... Clean RGB values in transparent area.
  -blend_alpha <hex> ..... Blend colors against background color
                           expressed as RGB values written in
                           hexadecimal, e.g. 0xc0e0d0 for red=0xc0
                           green=0xe0 and blue=0xd0.
  -noalpha ............... discard any transparency information.
  -lossless .............. Encode image losslessly.
  -hint <string> ......... Specify image characteristics hint.
                           One of: photo, picture or graph

  -metadata <string> ..... comma separated list of metadata to
                           copy from the input to the output if present.
                           Valid values: all, none (default), exif, icc, xmp

  -short ................. condense printed message
  -quiet ................. don't print anything.
  -version ............... print version number and exit.
  -noasm ................. disable all assembly optimizations.
  -v ..................... verbose, e.g. print encoding/decoding times
  -progress .............. report encoding progress

Experimental Options:
  -jpeg_like ............. Roughly match expected JPEG size.
  -af .................... auto-adjust filter strength.
  -pre <int> ............. pre-processing filter
```

## License

This is licensed under BSD.

WebP is licensed under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/).