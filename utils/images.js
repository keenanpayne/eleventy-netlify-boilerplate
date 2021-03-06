/**
 * Convert PNG and JPEG images to WebP for browsers that support it
 */

const path = require('path')
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const webp = require('imagemin-webp');
const assetSrc = path.join(process.cwd(), 'static/images/*.{jpg,png}');
const assetDist = path.join(process.cwd(), '_site/static/images');

imagemin([assetSrc], assetDist, {
	plugins: [
    imageminJpegtran(),
    imageminPngquant({quality: '65-80'})
	]
});

imagemin([assetSrc], assetDist, {
	plugins: [
    webp({lossless: true})
	]
});
