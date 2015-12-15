LSIFY
=====
*LiveScript transform for Browserify*

[![Build Status](https://travis-ci.org/Barandis/lsify.svg?branch=master)](https://travis-ci.org/Barandis/lsify)

Lsify lets you write [LiveScript][livescript] and have [Browserify][browserify] automatically compile it into 
JavaScript. This means that JavaScript and LiveScript can be mixed in the same project arbitrarily; lsify will cause
Browserify to compile the LiveScript, which will then be bundled as JavaScript along with any other JavaScript files 
needed for the bundle.

For this to work properly, LiveScript files must have an extension of ".ls" (which they do anyway for LiveScript to 
compile them) and must be required with this extension:

```javascript
test = require('./test.ls');
```

Options can be passed through to the LiveScript compiler either through the API:

```javascript
bundle.transform(require("lsify"), { header: false, const: true });
```

or through package.json:

```javascript
{
  "name": "my-project",
  "browserify": {
    "transform": [
      ["lsify", { "header": false, "const": true }]
    ]   
  }
}
```

Options
-------

Note that because Browserify is used in a CommonJS setup where bare compilation is the norm, this transform **makes the 
default value of the `bare` option `true`**. All other options are simply passed along to LiveScript, so the default 
values remain the same as they are there.

New: Source Maps
----------------

LiveScript added [source maps][sourcemaps] in 1.4.0, though they did it in a slightly unexpected way which makes the 
compiler output its code differently when creating source maps as opposed to not creating them. Therefore, just passing 
the `map` option as-is broke compilation in 0.2.0.

Support has been added in 0.3.0 to allow source maps to be properly created (or not). However, only embedded source 
maps make any sense in a Browserify context. Therefore, the only values from the LiveScript compiler's `map` option 
that are supported are `"none"` and `"embedded"`. Alternately, you can use `true` or `false` (default is 
`false`/`"none"`) to indicate whether you want source maps generated and embedded.

Embeddeding source maps allows JavaScript debugging tools (including the Chrome debugger and Firebug) to display the
original LiveScript code and to translate locations, breakpoints, etc. back to the original source. Essentially it lets
you debug original LiveScript instead of compiled, bundled JavaScript.

Source maps require that the Browserify `debug` option be set to `true`. Otherwise lsify will still generate the source 
maps, but Browserify will drop them when it does its bundling.

Changes
-------

**0.3.0**

* Added embedded source map support.

**0.2.0**

* Fixed LiveScript require to use all lower-case. This was needed because LiveScript 1.4.0 changed its package name
  to be all lower-case. While this is probably the way it should be, it does mean that lsify now requires
  LiveScript 1.4.0+.
* Removed peer dependencies. The changes recently made in Node itself make them unnecessary.
* Updated CI config to test against Node up to version 4.1.

[livescript]: http://livescript.net/
[browserify]: http://browserify.org/
[sourcemaps]: http://livescript.net/blog/livescript-1.4.0-source-maps-more.html
