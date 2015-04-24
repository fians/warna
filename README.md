# Warna

[![Circle CI](https://circleci.com/gh/fians/warna.svg?style=svg)](https://circleci.com/gh/fians/warna)

Warna is color utility library written in Javascript
to help you parse, convert, or manipulate colors.
It can works on browser or Node.js as npm modules.

## Installation

You can install Warna via npm,

```
npm install warna
```

or download latest version from [Github](https://github.com/onebytelabs/warna/releases)

## Getting Started

**Node.js**

```javascript
var warna = require('warna');

var hex = '#ffffff';
var color = warna.parse(hex);

console.log(color.rgb);
// will print {red: 255, green: 255, blue: 255}
```

**Browser**

```html
<script src="/path/to/warna.js"></script>
<script>
  var hex = '#ffffff';
  var color = warna.parse(hex);
  
  console.log(color.rgb);
  // will print {red: 255, green: 255, blue: 255}
</script>
```

## Quick Examples

__Convert color to RGB or HEX.__

```javascript
// Convert HEX to RGB
var color = warna.parse('#000000');
console.log(color.rgb); 
// will print {red: 0, green: 0, blue: 0}

// Convert RGB to HEX
var color = warna.parse(0, 0, 0);
console.log(color.hex); 
// will print '#ffffff'
```

__Get gradient color position or color slices.__

```javascript
// Get color in center of white-black gradient
var color = warna.gradient('#ffffff', '#000000').getPosition(0.5).hex;
console.log(color); 
// will print '#7f7f7f'

// Get 3 color slices in red-blue gradient
var color = warna.gradient('#ff0000', '#0000ff').getSlices(3, 'hex');
console.log(color);

//  will print
//  [ '#ff0000', '#7f007f', '#0000ff']
```

__Lighten or darken color.__

```javascript
// Lighten red by 20%
var color = warna.lighten('#ff0000', 0.2).hex;
console.log(color); 
// will print '#ff3333'

// Darken red by 20%
var color = warna.darken('#ff0000', 0.2).hex;
console.log(color); 
// will print '#cc0000'
```

## API

### parse(color)

Parse color value into Warna object which is a object that contain various format of color, like RGB, HSV, HSL, HEX and Alpha value.

_Argument:_

* `color` - _(mixed)_ Color value that will be parsed. It can be a HEX color string, RGB, HSV and HSL object.

_Example:_

```javascript
// Parse Red HEX color string
warna.parse('#000000');
/**
  return { 
    rgb: { red: 255, green: 0, blue: 0 },
    hex: '#ff0000',
    hsv: { hue: 0, saturation: 100, value: 100 },
    hsl: { hue: 0, saturation: 1, luminosity: 0.5 },
    alpha: 1 
  }
*/

// This also return same object like above
warna.parse({red: 255, green: 0, blue: 0}); // RGB object
warna.parse({hue: 0, saturation: 100, value: 100}); // HSV object
warna.parse({hue: 0, saturation: 1, luminosity: 0.5}); // HSL object

```

### gradient(begin, end)

Set gradient color object which can be chained with other gradient utility function like `getPosition()` or `getSlices()`.

_Arguments:_

* `begin` - _(mixed)_ Beginning color value. It can be a HEX color string, RGB object or RGB array.
* `end` - _(mixed)_ Ending color value. It can be a HEX color string, RGB object or RGB array.


### getPosition(pos)

Get color value on gradient based on their position and return Warna object.

_Argument:_

* `pos` - _(float)_ Float value (percent) of color position.

_Example:_

```javascript
// Getting middle color of red-white gradient
var gradient = new warna.Gradient('#ff0000', '#ffffff');
gradient.getPosition(0.5);

/* Return a Warna object 
  { 
    rgb: {red: 255, green: 127, blue: 127},
    hex: '#ff7f7f',
    hsv: {hue: 0, saturation: 50, value: 100},
    hsl: {hue: 0, aturation: 1, luminosity: 0.7490196078431373},
    alpha: 1 
  }
*/

// You can also pass alpha value to gradient
var firstColor = {red: 255, green: 0, blue: 0, alpha: 0.25};
var secondColor = {red: 255, green: 255, blue: 255, alpha: 0.75};

var gradient = new warna.Gradient(firstColor, secondColor);
gradient.getPosition(0.5);

/* Return warna object
  { 
    rgb: {red: 255, green: 127, blue: 127},
    hex: '#ff7f7f',
    hsv: {hue: 0, saturation: 50, value: 100},
    hsl: {hue: 0, saturation: 1, luminosity: 0.7490196078431373},
    alpha: 0.5 
  }
*/
```

### getSlices(slice, type)

Get color slices of a gradient and return array of Warna object based on number slices you want to get. Slice should be more than `2`, if you want to get other color value other than start color and ending color.

_Argument:_

* `slice` - _(integer)_ Integer value of number slices you want to get.
* `type` - _(string)_ Type of color you want to output (`rgb`, `hex`, `hsv`, or `hsl`).

_Example:_

```javascript
// Getting 3 color slices of black-white gradient
warna.gradient('#ffffff', '#000000').getSlices(3, 'hex');

//  Return
//  [ '#ffffff', '#7f7f7f', '#000000']
```

### lighten(color, pos)

Lighten a color. Return warna object.

_Arguments:_

* `color` - _(mixed)_ Color value that will be lighten. It can be a HEX color string, RGB object or RGB array.
* `pos` - _(float)_ Float value of lighten percentation. `0` will returning base color and `1` will return white `#ffffff`.

_Example:_

```javascript
// Lighten red by 20%
warna.lighten('#ff0000', 0.2);

/*
 Return
  { 
    rgb: {red: 255, green: 51, blue: 51},
    hex: '#ff3333',
    hsv: {hue: 0, saturation: 80, value: 100},
    hsl: {hue: 0, saturation: 1, luminosity: 0.6},
    alpha: 1 
  }
*/
```

### darken(color, pos)

Darken a color.

_Arguments:_

* `color` - _(mixed)_ Color value that will be lighten. It can be a HEX color string, RGB object or RGB array.
* `pos` - _(float)_ Float value of lighten percentation. `0` will returning base color and `1` will return black `#000000`.

_Example:_

```javascript
// Darken red by 20%
warna.darken('#ff0000', 0.2);

/* 
  Return
  { 
    rgb: {red: 204, green: 0, blue: 0},
    hex: '#cc0000',
    hsv: {hue: 0, saturation: 100, value: 80},
    hsl: {hue: 0, saturation: 1, luminosity: 0.4},
    alpha: 1 
  }
*/
```

## Copyright and license

Copyright 2014 Alfiana E. Sibuea. Code released under [the MIT license](LICENSE).

