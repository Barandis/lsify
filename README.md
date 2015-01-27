LSIFY
=====
*LiveScript transform for Browserify*

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

[livescript]: http://livescript.net/
[browserify]: http://browserify.org/
