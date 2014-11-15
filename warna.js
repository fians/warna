
/*!
 * Warna v0.2.3
 * https://github.com/onebytelabs/warna/
 */

(function (undefined) {
	'use strict';

	// Define module, global and property
	var warna = {},
		global = typeof global !== 'undefined' ? global : this;

	function clone(obj) {

	    if (null === obj || "object" !== typeof obj) {
	    	return obj;
	    }

	    var copy = obj.constructor();

	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) {
	        	copy[attr] = obj[attr];
	        }
	    }

	    return copy;
	}

	/** 
	 * Converter tools
	 */

	/**
	 * RGB - HEX converter
	 * Original Source: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 */
	function hexToRgb(hex) {

	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        red: parseInt(result[1], 16),
	        green: parseInt(result[2], 16),
	        blue: parseInt(result[3], 16)
	    } : null;

	}

	function rgbToHex(red, green, blue) {
		return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
	}

	/**
	 * RGB - HSV converter
	 * Original Source: http://design.geckotribe.com/colorwheel/
	 */
	function hsvToRgb(hue, saturation, value) {

		var red, green, blue;

		if (saturation === 0) {

			red = green = blue = Math.round(value * 2.55);

		} else {

			hue /= 60;
			saturation /= 100;
			value /= 100;

			var i = Math.floor(hue);
			var f = hue - i;
			var p = value * (1 - saturation);
			var q = value * (1 - saturation * f);
			var t = value * (1 - saturation * (1 - f));

			switch(i) {
				case 0: 
					red 	= hsv.value; 
					green 	= t; 
					blue 	= p; 
					break;
				case 1: 
					red 	= q; 
					green 	= hsv.value; 
					blue 	= p; 
					break;
				case 2: 
					red 	= p; 
					green 	= hsv.value; 
					blue 	= t; 
					break;
				case 3: 
					red 	= p; 
					green 	= q; 
					blue 	= hsv.value; 
					break;
				case 4: 
					red 	= t; 
					green 	= p; 
					blue 	= hsv.value; 
					break;
				default: 
					red 	= hsv.value; 
					green 	= p; 
					blue 	= q;
			}

			red 	= Math.round(red * 255);
			green 	= Math.round(green * 255);
			blue 	= Math.round(blue * 255);
		}

		return {
			red: red,
			green: green,
			blue: blue
		};
	}

	function rgbToHsv(red, green, blue) {

		var hue, saturation, value;

		function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
		function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }

		var max = max3(red, green, blue);
		var dif = max - min3(red, green, blue);

		saturation = (max === 0.0) ? 0 : (100 * dif / max);

		if (saturation === 0) {
			hue = 0;
		} else if (red === max) {
			hue = 60.0 * (green - blue) / dif;
		} else if (green === max) {
			hue = 120.0 + 60.0 * (rgb.b - rgb.r) / dif;
		} else if (blue === max) {
			hue = 240.0 + 60.0 * (rgb.r - rgb.g) / dif;
		}

		if (hue < 0.0) {
			hue += 360.0;
		}

		return {
			hue: Math.round(hue),
			saturation: Math.round(saturation),
			value: Math.round(max * 100 / 255)
		};
	}

	/**
	 * RGB - HSL converter
	 * Original Source: http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	 */
	function hslToRgb(hue, saturation, luminosity){

	    var red, green, blue;

        function hue2rgb(p, q, t) {

            if(t < 0) t += 1;
            if(t > 1) t -= 1;

            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;

            return p;
        }

	    if (saturation === 0) {

	        red = green = blue = luminosity;

	    } else {

	        var q = luminosity < 0.5 ? luminosity * (1 + saturation) : luminosity + saturation - luminosity * saturation;
	        var p = 2 * luminosity - q;

	        red 	= hue2rgb(p, q, hue + 1/3);
	        green 	= hue2rgb(p, q, hue);
	        blue 	= hue2rgb(p, q, hue - 1/3);
	    }

	    return {
	    	red: Math.round(red * 255),
	    	green: Math.round(green * 255),
	    	blue: Math.round(blue * 255)
	    };
	}

	function rgbToHsl(red, green, blue){

	    red = red / 255;
    	green = green / 255; 
    	blue = blue / 255;

	    var max = Math.max(red, green, blue), 
	    	min = Math.min(red, green, blue);

	    var hue, 
	    	saturation, 
	    	luminosity = (max + min) / 2;

	    if (max === min) {

	        hue = saturation = 0;

	    } else {

	        var d = max - min;
	        saturation = luminosity > 0.5 ? d / (2 - max - min) : d / (max + min);

	        switch(max){
	            case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
	            case green: hue = (blue - red) / d + 2; break;
	            case blue: hue = (red - green) / d + 4; break;
	        }

	        hue /= 6;
	    }

	    return {
	    	hue: hue,
	    	saturation: saturation,
	    	luminosity: luminosity
	    };
	}

	/**
	 * Parser utility
	 */
	warna.parse = function(color) {

		var rgb, hex, hsv, alpha = 1;

		// Convert all type to rgb object
		if (typeof color === 'string') {

			rgb 		= hexToRgb(color);

		} else if (color instanceof Object) {

			// Parse RGB object
			if (
				('red' in color) && 
				('green' in color) && 
				('blue' in color)
			) {
				rgb = {
					red: color.red,
					green: color.green,
					blue: color.blue
				};
			}

			// Convert HSV object
			if (
				('hue' in color) && 
				('saturation' in color) && 
				('value' in color)
			) {
				rgb = hsvToRgb(color.hue, color.saturation, color.value);
			}

			// Convert HSL object
			if (
				('hue' in color) && 
				('saturation' in color) && 
				('luminosity' in color)
			) {
				rgb = hslToRgb(color.hue, color.saturation, color.luminosity);
			}

		}

		// RGB is not converted
		if (!rgb) {
			return null;
		}

		// Check alpha
		if (color instanceof Object) {
			if ('alpha' in color) {
				alpha = color.alpha;
			}
		}

		return {
			rgb: rgb,
			hex: rgbToHex(rgb.red, rgb.green, rgb.blue),
			hsv: rgbToHsv(rgb.red, rgb.green, rgb.blue),
			hsl: rgbToHsl(rgb.red, rgb.green, rgb.blue),
			alpha: alpha
		};
	};

	/**
	 * Gradient utility
	 */
	function Gradient(begin, end) {

		// Parse color parameter
		begin = warna.parse(begin);
		end = warna.parse(end);

		// Prepare gradient
		var gradient = {
			begin: begin.rgb,
			end: end.rgb
		};

		// Add alpha value
		gradient.begin.alpha = begin.alpha;
		gradient.end.alpha = end.alpha;

		if (!gradient.begin) {
			throw Error('Beginning color is not formatted properly.');
		}

		if (!gradient.end) {
			throw Error('Ending color is not formatted properly.');
		}

		this.gradient = gradient;
		
		return this;
	}

	Gradient.prototype.getPosition = function(pos) {

		var gradient = this.gradient;

		// Check gradient color
		if (!gradient.begin || !gradient.end) {
			throw Error('Gradient color is not defined.');
		}

		// Redefine color
		var begin 	= gradient.begin;
		var end 	= gradient.end;

		var color = {
		    red: begin.red + Math.floor(pos * (end.red - begin.red)),
		    green: begin.green + Math.floor(pos * (end.green - begin.green)),
		    blue: begin.blue + Math.floor(pos * (end.blue - begin.blue)),
		    alpha: begin.alpha + (pos * (end.alpha - begin.alpha))
		};

		return warna.parse(color);
	};

	Gradient.prototype.getSlices = function(slice, type) {

		type = type || null;
		var gradient = this.gradient;	

		// Check gradient color
		if (!gradient.begin || !gradient.end) {
			throw Error('Gradient color is not defined.');
		}

		if (slice < 1) {
			throw Error('Slices cannot be less than 1.');
		}

		// Get position of the slices
		var initialPos = 0,
			range = 1/(slice - 1),
			positions = [];

		positions.push(0);

		if (slice > 1 && range > 0 && range < 1) {
			while (initialPos < 1) {
				initialPos += range;

				if (initialPos > 0.999) {
					initialPos = 1;
				}

				positions.push(initialPos);
			}
		}

		if (slice == 2) {
			positions.push(1);
		}

		// Get color based on slices
		var colors = [];

		for (var a = 0; a < positions.length; a++) {
			colors.push(this.getPosition(positions[a]));
		}
		
		function convert(type) {
			var result = [];

			for (var a = 0; a < colors.length; a++) {

				var color = colors[a][type];

				// Detect alpha value
				if ((type === 'rgb' || type === 'hsv' || type === 'hsl') && colors[a].alpha !== 1) {
					color.alpha = colors[a].alpha;
				} 

				result.push(color);
			}

			return result;
		}

		// Return raw type
		if (!type) {
			return colors;
		}

		return convert(type);
	};

	warna.Gradient = Gradient;

	/**
	 * Brightness utility
	 */
	warna.lighten = function(color, pos) {
		var grad = new Gradient(color, '#ffffff');
		return grad.getPosition(pos);
	};

	warna.darken = function(color, pos) {
		var grad = new Gradient(color, '#000000');
		return grad.getPosition(pos);
	};

	/**
	 * Exposing Warna
	 */

	// Browser use
	if (typeof window === 'object') {
		window.warna = warna;
	}

	// Node.js use
	if (typeof module === 'object' && typeof module.exports === "object") {
		module.exports = warna;
	}

}).call(this);