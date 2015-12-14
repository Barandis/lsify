LSIFY
=====
*LiveScript transform for Browserify*

[![Build Status](https://travis-ci.org/Barandis/lsify.svg?branch=master)](https://travis-ci.org/Barandis/lsify)

Lsify lets you write [LiveScript][livescript] and have [Browserify][browserify] 
automatically compile it into JavaScript. This means that JavaScript and 
LiveScript can be mixed in the same project arbitrarily; Browserify will 
compile the LiveScript and leave the JavaScript alone.

For this to work properly, LiveScript files must have an extension of ".ls"
(which they do anyway for LiveScript to compile them) and must be required
with this extension:

```javajcript
test = require('./test.ls');
```

Options can be passed through to the LiveScript compiler either through the
API:

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

Note that because Browserify is used in a CommonJS setup where bare
compilation is the norm, this transform **makes the default value of the `bare`
option `true`**. All other options are simply passed along to LiveScript, so
the default values remain the same as they are there.

Changes
-------

**0.2.0**

* Fixed LiveScript require to use all lower-case. This was needed because LiveScript 1.4.0 changed its package name
  to be all lower-case. While this is probably the way it should be, it does mean that lsify now requires
  LiveScript 1.4.0+.
* Removed peer dependencies. The changes recently made in Node itself make them unnecessary.
* Updated CI config to test against Node up to version 4.1.

[livescript]: http://livescript.net/
[browserify]: http://browserify.org/
