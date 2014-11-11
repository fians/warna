
/**
 * Warna gradient utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Gradient utility test:', function() {

	describe('getPosition()', function() {

		it('should return correct Warna object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');
			
			assert.deepEqual(color.getPosition(0.5), {
				rgb: {
					red: 127,
					green: 127,
					blue: 127
				},
				hsv: {
					hue: 0,
					saturation: 0,
					value: 50
				},
				hsl: {
					hue: 0, 
					saturation: 0, 
					luminosity: 0.4980392156862745
				},
				hex: '#7f7f7f',
				alpha: 1
			});
		});

		it('should return correct Warna object (with alpha)', function() {

			var color = new warna.Gradient({
				red: 255, 
				green: 255, 
				blue: 255, 
				alpha: 0.25
			}, {
				red: 0, 
				green: 0, 
				blue: 0, 
				alpha: 0.75
			});

			assert.deepEqual(color.getPosition(0.5), {
				rgb: {
					red: 127,
					green: 127,
					blue: 127
				},
				hsv: {
					hue: 0,
					saturation: 0,
					value: 50
				},
				hsl: {
					hue: 0, 
					saturation: 0, 
					luminosity: 0.4980392156862745
				},
				hex: '#7f7f7f',
				alpha: 0.5
			});
		});
		
	});

	describe('getSlices()', function() {

		it('should return raw Warna object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');

			assert.deepEqual(color.getSlices(3)[1], {
				rgb: {
					red: 127,
					green: 127,
					blue: 127
				},
				hsv: {
					hue: 0,
					saturation: 0,
					value: 50
				},
				hsl: {
					hue: 0, 
					saturation: 0, 
					luminosity: 0.4980392156862745
				},
				hex: '#7f7f7f',
				alpha: 1
			});

		});

		it('should return hex string', function() {

			var color = new warna.Gradient('#ffffff', '#000000');
			assert.equal(color.getSlices(3, 'hex')[1], '#7f7f7f');

		});

		it('should return RGB object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');
			assert.deepEqual(color.getSlices(3, 'rgb')[1], {
				red: 127,
				green: 127,
				blue: 127
			});

		});

		it('should return RGB object (with Alpha)', function() {

			var color = new warna.Gradient({
				red: 255, 
				green: 255, 
				blue: 255, 
				alpha: 0.25
			}, {
				red: 0, 
				green: 0, 
				blue: 0, 
				alpha: 0.75
			});

			assert.deepEqual(color.getSlices(3, 'rgb')[1], {
				red: 127,
				green: 127,
				blue: 127,
				alpha: 0.5
			});

		});

		it('should return HSV object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');
			assert.deepEqual(color.getSlices(3, 'hsv')[1], {
				hue: 0,
				saturation: 0,
				value: 50
			});

		});

		it('should return HSV object (with Alpha)', function() {

			var color = new warna.Gradient({
				red: 255, 
				green: 255, 
				blue: 255, 
				alpha: 0.25
			}, {
				red: 0, 
				green: 0, 
				blue: 0, 
				alpha: 0.75
			});

			assert.deepEqual(color.getSlices(3, 'hsv')[1], {
				hue: 0,
				saturation: 0,
				value: 50,
				alpha: 0.5
			});

		});

		it('should return HSL object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');
			assert.deepEqual(color.getSlices(3, 'hsl')[1], {
				hue: 0, 
				saturation: 0, 
				luminosity: 0.4980392156862745
			});

		});

		it('should return HSL object (with Alpha)', function() {

			var color = new warna.Gradient({
				red: 255, 
				green: 255, 
				blue: 255, 
				alpha: 0.25
			}, {
				red: 0, 
				green: 0, 
				blue: 0, 
				alpha: 0.75
			});

			assert.deepEqual(color.getSlices(3, 'hsl')[1], {
				hue: 0, 
				saturation: 0, 
				luminosity: 0.4980392156862745,
				alpha: 0.5
			});

		});


	});

});