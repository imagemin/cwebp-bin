'use strict';

var path = require('path');

/**
 * Module exports
 */

exports.path = path.join(__dirname, 'vendor', process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');
exports.version = '0.4.3';
